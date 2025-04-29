import {z} from "zod"
import i18n from "@/i18n";

const t = i18n.t;
export const menuSchema = z.object({
    name:z.string().nonempty({message: t("menuValidation.nameRequired") }),
    description:z.string().nonempty({message:t("menuValidation.descriptionRequired")}),
    price:z.number().min(0,{message:t("menuValidation.priceNegative")}),
    image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:t("menuValidation.imageRequired")}),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;