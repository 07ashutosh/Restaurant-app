import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity, removeFromTheCart, clearCart } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  let totalAmount = cart.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 rounded-2xl p-4">
      <div className="flex justify-end">
        <Button variant="link" onClick={() => clearCart()}>
          {t("cart.clear")}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("cart.items")}</TableHead>
            <TableHead>{t("cart.title")}</TableHead>
            <TableHead>{t("cart.price")}</TableHead>
            <TableHead>{t("cart.quantity")}</TableHead>
            <TableHead>{t("cart.total")}</TableHead>
            <TableHead className="text-right">{t("cart.remove")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button onClick={() => decrementQuantity(item._id)} size="icon" variant="outline" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-500">
                    <Minus />
                  </Button>
                  <Button size="icon" className="font-bold border-none" disabled variant="outline">
                    {item.quantity}
                  </Button>
                  <Button onClick={() => incrementQuantity(item._id)} size="icon" className="rounded-full bg-yellow-500 hover:bg-yellow-600" variant="outline">
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl" onClick={() => removeFromTheCart(item._id)}>
                  {t("cart.remove")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>{t("cart.totalAmount")}</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex flex-row justify-between my-5">
        <Button onClick={() => navigate(`/restaurants`)} className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
          {t("cart.continue")}
        </Button>
        <Button onClick={() => setOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
          {t("cart.checkout")}
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
