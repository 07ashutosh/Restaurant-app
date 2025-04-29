import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Globe, MapPin, Search, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Restaurant } from "@/type/RestaurantType";
import { useTranslation } from "react-i18next";

function SearchPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    setAppliedFilter,
    appliedFilter,
  } = useRestaurantStore();

  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
  }, [params.text!, appliedFilter]);

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between gap">
        <FilterPage />
        <div className="flex-1">
          <div className="relative flex items-center gap-2 mt-3">
            <Input
              type="text"
              value={searchQuery}
              placeholder={t("search.placeholder")}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 focus-visible:ring-1 rounded-2xl shadow-lg dark:bg-gray-900 dark:text-white"
            />
            <Button
              className="h-7.5 absolute right-1 inset-y inset-x rounded-2xl bg-yellow-500 hover:bg-yellow-600"
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
            >
              {t("search.button")}
            </Button>
            <Search className="absolute border-gray-700 inset-y-1 left-2 h-7.5" />
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg m-1">
                ({searchedRestaurant?.data?.length}) {t("search.resultFound")}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter?.map((selectedFilter: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full  px-2 py-1 rounded-lg"
                  >
                    <X
                      onClick={() => setAppliedFilter(selectedFilter)}
                      size={16}
                      className="text-[#5e5a28] mr-1 hover:cursor-pointer"
                    />
                    <div className="text-[#5e5a28] whitespace-nowrap">
                      {selectedFilter}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data?.map((restaurant: Restaurant) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className=" mt-4 bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
