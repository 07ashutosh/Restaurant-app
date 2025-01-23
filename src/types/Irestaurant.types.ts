import  mongoose  from "mongoose";

export interface IRestaurant{
    user:mongoose.Schema.Types.ObjectId;
    restaurantname:string;
    city:string;
    country:string;
    deliveryTime:number;
    cuisines:string[];
    imageUrl:string;
    menu:mongoose.Schema.Types.ObjectId;
}