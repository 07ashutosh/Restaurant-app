import { User } from "../model/user.modle";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponce";
import { asyncHandler } from "../utils/asyncHandeler";
import crypto from "crypto";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetPassword, sendResetSuccessEmail, sendVerificatiionEmail, sendWelcomeEmail } from "../email/email";



// regestr user
const regesterUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, contact } = req.body
    
    if ([fullName, email, password, contact].some((field) => field?.trim() === ""))
    //some(requires call back) is applied on the array which checks every elements(or field) in the array if any element is emtpty it throws the error
    {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "user with email or user name alredy exist");
    }

    const verificationToken = generateVerificationCode()

    const user = await User.create({
        fullName,
        email,
        password,
        contact,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000

    })

    generateToken(res,user)

    await sendVerificatiionEmail (email , verificationToken);

    // if user not created throw an error
    if (!user) {
        throw new ApiError(403, "user Not created")
    }
    //remove password and refresh token from the user detail before showing data to the user
    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user regestered successfully")
    )


});

//login 
const loginUser = asyncHandler(async (req, res) => {
    // Get data from req.body
    const { email, password } = req.body;

    // Validate if email is provided
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    // Validate if user exists
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Validate the password using isPasswordCorrect method
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

   generateToken(res,user);

    user.lastLogin = new Date();
    await user.save();

    // Retrieve the logged-in user details without password and refreshToken
    const loggedInUser = await User.findById(user._id).select("-password");

    // Set cookie options
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict" as const,
    };

    // Send cookies and response
    return res
        .status(200)
        // .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    // accessToken,
                    // refreshToken,
                },
                "User logged in successfully"
            )
        );
});

//email verification 
const verifyEmail = asyncHandler(async (req,res)=>{
    const {verificationCode} = req.body;
    const user = await User.findOne({verificationToken:verificationCode,verificationTokenExpiresAt:{$gt : Date.now()}}).select("-password");

    if(!user){
        throw new ApiError(400,"invalid or expired verification token")
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //sending welcome email
    await sendWelcomeEmail(user.email,user.fullName);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "email verified successfully"
        )
    )
});

//logout
const logout = asyncHandler(async(_,res)=>{
    return res.clearCookie("token")
    .status(200)
    .json(
        new ApiResponse(
            200,
            "logged out successfully"
        )
    );
});

//forget password
const forgotPassword = asyncHandler(async (req,res)=>{
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(!user){
        throw new ApiError(400,"user dosen't exist")
    }

    const resetToken = crypto.randomBytes(30).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now()+1*60*60*1000)

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    user.save();

    //send email
    await sendPasswordResetPassword(user.email,`${process.env.FRONTEND_URL} /resetpassword/ ${resetToken}`);

    return res 
    .status(200)
    .json(
        new ApiResponse(
            200,
            "password reset link is send to your email"
        )
    )
});

// reset password
const resetPassword = asyncHandler(async (req,res)=>{
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken:token,resetPasswordTOkenExpiresAt:{ $gt: Date.now()} })

    if(!user){
        throw new ApiError(400,"invalid or expired reset token.")
    }

    //update password
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //send success email
    await sendResetSuccessEmail(user.email);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "password reset successfully"
        )
    )
});

//Authentication
const checkAuth = asyncHandler(async (req,res)=>{
    const userId = req.id;
    const user = await User.findById(userId).select("-password")
    if(!user){
        throw new ApiError(404,"user not found")
    };
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user
        )
    )
});

//update profile
const updateProfile = asyncHandler(async (req,res)=>{
    const userId = req.id;
    const { fullName, email, address, city, country, profilePhoto, contact } = req.body;

    let cloudResponce:any;
    cloudResponce = await cloudinary.uploader.upload(profilePhoto);

    if(!cloudResponce){
        throw new ApiError(400,"photo does not uploded successfully")
    }

    const updatedData = { fullName, email, address, city, country, profilePhoto, contact };
    const user = await User.findByIdAndUpdate(
        userId,
        updatedData,
        {new:true}
    ).select("-password");

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"profile updated successfully")
    );


});





export { 
    regesterUser, 
    loginUser,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth,
    updateProfile
}