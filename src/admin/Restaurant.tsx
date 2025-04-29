import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestaurantFormSchema, restaurantFromSchema, } from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const Restaurant = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
  const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant, } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // add restaurant api implementation start from here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      };
    }
    fetchRestaurant();

  }, []);


  return (
    <div className="max-w-7xl mx-auto my-10  rounded-2xl p-4">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">{t('restaurantForm.title')}</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div className="">
                <Label className=" text-gray-800 dark:text-gray-50">{t('restaurantForm.name')}</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder={t('restaurantForm.placeholder.name')}
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label className=" text-gray-800 dark:text-gray-50">{t('restaurantForm.city')}</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder={t('restaurantForm.placeholder.city')}
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label className=" text-gray-800 dark:text-gray-50">{t('restaurantForm.country')}</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder={t('restaurantForm.placeholder.country')}
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label className=" text-gray-800 dark:text-gray-50">{t('restaurantForm.deliveryTime')}</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder={t('restaurantForm.placeholder.deliveryTime')}
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label className=" text-gray-800 dark:text-gray-50">{t('restaurantForm.cuisines')}</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder={t('restaurantForm.placeholder.cuisines')}
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label className="">{t('restaurantForm.uploadBanner')}</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  className=" rounded-2xl mt-2 focus-visible:ring-1 text-black dark:text-gray-50 bg-gray-200 dark:bg-gray-600"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('restaurantForm.button.loading')}
                </Button>
              ) : (
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
                  {restaurant
                    ? t('restaurantForm.button.update')
                    : t('restaurantForm.button.add')
                    }
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;