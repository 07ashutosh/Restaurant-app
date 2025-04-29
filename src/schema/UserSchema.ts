import { z } from 'zod';
import i18n from "@/i18n";

const t = i18n.t;

export const UserSignupSchema = z.object({
    fullName: z.string().min(1, t("userValidation.fullNameRequired")),
    email: z.string().email(t("userValidation.emailInvalid")),
    password: z.string().min(6, t("userValidation.passwordMin")),
    contact: z.string().min(10, t("userValidation.contactMin"))
});

export type userSingup = z.infer<typeof UserSignupSchema>;

export const UserLogiSchema = z.object({
    email: z.string().email(t("userValidation.emailInvalid")),
    password: z.string().min(6, t("userValidation.passwordMin")),
});

export type userLogin = z.infer<typeof UserLogiSchema>;