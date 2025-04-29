import { z } from "zod";
import i18n from "@/i18n";

const t = i18n.t;

export const restaurantFromSchema = z.object({
  restaurantName: z.string().nonempty({ message: t("validation.restaurant_name_required") }),
  city: z.string().nonempty({ message: t("validation.city_required") }),
  country: z.string().nonempty({ message: t("validation.country_required") }),
  deliveryTime: z.number().min(0, { message: t("validation.delivery_time_non_negative") }),
  cuisines: z.array(z.string()),
  imageFile: z.instanceof(File).optional().refine(
    (file) => file?.size !== 0,
    { message: t("validation.image_file_required") }
  )
});

export type RestaurantFormSchema = z.infer<typeof restaurantFromSchema>;
