// import { verifyEmail } from "../controller/user.controller";
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";


const sendVerificatiionEmail = async (email: string, verificationToken: string) => {
    const recipients = [{ email }];
   try {
    const res =await client.send({
        from:sender,
        to:recipients,
        subject:'verify your email',
        html:htmlContent.replace("{verificationToken}",verificationToken),
        category:'Email Verificatin'
    });
   } catch (error) {
        console.log("failed to send verification email!!!",error);        
   }

}

const sendWelcomeEmail = async (email:string,name:string)=>{
    const recipients = [{ email }];
    const htmlcontent = generateWelcomeEmailHtml(name);
   try {
    const res =await client.send({
        from:sender,
        to:recipients,
        subject:'welcome to AtEATs',
        html:htmlcontent,
        template_variables:{
            company_info_name : "AtEATs",
            name :name
        }
    });
   } catch (error) {
        console.log("failed to send welcome email!!!",error);        
   }

}

const sendPasswordResetPassword =  async (email:string,resetURL:string)=>{
    const recipients = [{ email }];
    const htmlcontent = generatePasswordResetEmailHtml(resetURL);
   try {
    const res =await client.send({
        from:sender,
        to:recipients,
        subject:'reset your password',
        html:htmlcontent,
        category:'reset password'
        
    });
   } catch (error) {
        console.log("failed to reset password",error);        
   }

}

const sendResetSuccessEmail =  async (email:string)=>{
    const recipients = [{ email }];
    const htmlcontent = generateResetSuccessEmailHtml()
   try {
    const res =await client.send({
        from:sender,
        to:recipients,
        subject:'password reset successfully',
        html:htmlcontent,
        category:'password reset'
        
    });
   } catch (error) {
        console.log("failed to send reset password success email!!!",error);        
   }

}



export { 
    sendVerificatiionEmail,
    sendWelcomeEmail,
    sendPasswordResetPassword,
    sendResetSuccessEmail
 }
