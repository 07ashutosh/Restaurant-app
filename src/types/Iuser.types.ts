
export interface IUser{
    _id:string;
    fullName:string;
    email:string;
    password:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePhoto:string;
    admin:boolean;
    lastLogin?:Date;
    isVerified?:boolean;
    resetPasswordToken?:string;
    resetPasswordExpiresAt?:Date;
    verificationToken?:string;
    verificationTokenExpiresAt?:Date;

    isModified?:any
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}