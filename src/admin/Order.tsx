import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


const Orders = () => {
  const { t } = useTranslation();
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } = useRestaurantStore();
  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };
  useEffect(() => {
    getRestaurantOrders();
  }, []);
  return (
    <div className="max-w-6xl mx-auto py-10 px-6   rounded-2xl">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
      {t("overview")}
      </h1>
      <div className="space-y-8">
        {/* Restaurant Orders diplay here  */}
        {restaurantOrder.map((order) => (
          <div key={order._id} className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-gray-200 dark:bg-gray-600 shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-50 mt-2">
                <span className="font-semibold">{t("address")}: </span>
                {order.deliveryDetails.address}
              </p>
              <div className="text-gray-600 dark:text-gray-50 mt-2">
                <span className="font-semibold">{t("item")}: </span>
                {order.cartItem?.map((item, idx) => (
                  <span key={idx}>
                    {item.name} = {item.quantity} × ₹{item.price}
                    {idx < order.cartItem.length - 1 && ', '}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-50 mt-2">
                <span className="font-semibold">{t("totalAmount")}: </span>
                {order.totalAmount}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t("orderStatusTitle")}
              </Label>
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger className=" focus-visible:ring-1 rounded-2xl ">
                  <SelectValue placeholder={t("selectStatus")} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl backdrop-blur-[15px]">
                  <SelectGroup>
                    {[
                      t("orderStatus.pending"),
                      t("orderStatus.confirmed"),
                      t("orderStatus.preparing"),
                      t("orderStatus.outfordelivery"),
                      t("orderStatus.delivered"),
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;