import mongoose from "mongoose";

type DeliveryDetails = {
    email:string;
    name:string;
    address:string;
    city:string
}

type CartItem ={
    menuId : string;
    name:string;
    image:string;
    price:number;
    quantity:number;
}

export interface IOrder{
    user:mongoose.Schema.Types.ObjectId;
    restaurant:mongoose.Schema.Types.ObjectId;
    deliveryDetails:DeliveryDetails;
    cartItem:CartItem;
    totalAmount:number;
    status:"pending" | "delivered" | "confirmed" | "preparing" | "OutForDelivery"
}