import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useOrderStore } from "@/store/useOrderStore";
import { CheckoutSessionRequest } from "@/type/orderType";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { singleRestaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();

  const restaurantId = singleRestaurant?._id 
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItem: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurantId as string,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent className=" bg-white rounded-2xl dark:bg-gray-900 ">
        <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
        <DialogDescription className="text-sm">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label className=" ">Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <div>
            <Label className=" ">Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <div>
            <Label className=" ">Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <div>
            <Label className=" ">Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <div>
            <Label className=" ">City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <div>
            <Label className=" ">Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              className=" rounded-2xl mt-2 focus-visible:ring-1"
            />
          </div>
          <DialogFooter className="col-span-2 pt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;