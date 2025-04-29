import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/type/RestaurantType";
import { useCartStore } from "@/store/useCartStore";
import { useTranslation } from "react-i18next";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="md:p-4  rounded-2xl p-4 mb-5">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        {t('availableMenu.title')}
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0 ">
        {menus?.map((menu: MenuItem) => (
          <Card className="w-80 m-4 mx-auto shadow-lg overflow-hidden rounded-2xl">
            <img src={menu.image} alt="" className="w-full h-40 object-cover rounded-2xl p-2" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                {t('availableMenu.price')} <span className="text-[#D19254]">{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  
                  navigate("/cart"); 
                }}
                className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl"
              >
                {t('availableMenu.addToCart')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;