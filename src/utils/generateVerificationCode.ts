export const generateVerificationCode = (length: number = 6): string => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let verificationCode = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
       verificationCode += characters.charAt(Math.floor(Math.random()*charactersLength))
    }
    return verificationCode;
};