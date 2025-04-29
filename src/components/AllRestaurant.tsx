import { useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Globe, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Restaurants } from "@/type/RestaurantType";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AllRestaurants = () => {
  const { restaurants, fetchRestaurants } = useRestaurantStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">{t("allResTitle")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant: Restaurants) => (
          <Card
          key={restaurant._id}
          className="shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 mb-3"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <img
                src={restaurant.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("restaurant.featured")}
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {restaurant.restaurantName}
            </h1>
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={16} />
              <p className="text-sm">
                {t("restaurant.city")}:{" "}
                <span className="font-medium">{restaurant.city}</span>
              </p>
            </div>
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Globe size={16} />
              <p className="text-sm">
                {t("restaurant.country")}:{" "}
                <span className="font-medium">{restaurant.country}</span>
              </p>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {restaurant.cuisines.map((cuisine: string, idx: number) => (
                <div
                  key={idx}
                  className="font-medium text-[#5e5a28] px-2 py-1 rounded-2xl shadow-sm"
                >
                  🍴{cuisine}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
            <Link to={`/restaurant/${restaurant._id}`}>
              <Button className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                {t("restaurant.viewMenu")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
