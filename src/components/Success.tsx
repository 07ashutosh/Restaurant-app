import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { CartItem } from "@/type/cartType";
import { useTranslation } from "react-i18next";

const Success = () => {
    const { t } = useTranslation();
    const { orders, getOrderDetails } = useOrderStore();

    useEffect(() => {
        getOrderDetails();
    }, []);

    if (orders?.length === 0)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
                    {t("success.orderNotFound")}
                </h1>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white dark:bg-gray-600 shadow-lg rounded-2xl p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {t("success.orderStatus")}:
                    </h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        {t("success.orderSummary")}
                    </h2>

                    {orders?.map((order: any, index: number) => (
                        <div key={index}>
                            {order.cartItem.map((item: CartItem) => (
                                <div className="mb-4" key={item._id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                            <div>
                                                <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                                                    {item.name}
                                                </h3>
                                                <h6 className="ml-4 dark:text-gray-200 font-medium text-[#FF5A5A]">
                                                    {(order.status).toUpperCase()}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-800 dark:text-gray-200 flex items-center">
                                                <IndianRupee />
                                                <span className="text-lg font-medium">
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Link to="/cart">
                    <Button className="rounded-2xl bg-yellow-500 hover:bg-yellow-600 w-full py-3 shadow-lg">
                        {t("success.continueShopping")}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Success;
