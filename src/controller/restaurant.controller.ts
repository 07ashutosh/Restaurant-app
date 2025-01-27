import { asyncHandler } from "../utils/asyncHandeler";
import { Restaurant } from "../model/restaurant.model";
// import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../model/order.model";
import { ApiResponse } from "../utils/ApiResponce";
import { ApiError } from "../utils/ApiError";

const createRestaurant = asyncHandler(async (req, res) => {

    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
        throw new ApiError(400, "Restaurant already exists");
    };

    if (!file) {
        throw new ApiError(400, "Please upload an image");
    };
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Restaurant.create({
        user: req.id,
        restaurantName,
        city,
        country,
        deliveryTime,
        cuisines: JSON.parse(cuisines),
        imageUrl
    });
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                "Restaurant created successfully"
            )
        );

});
const getRestaurant = asyncHandler(async (req, res) => {

    const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
    if (!restaurant) {
        return res.status(404).json({
            success: false,
            restaurant: [],
            message: "Restaurant not found"
        })
    };
    return res
        .status(200)
        .json(new ApiResponse(200, restaurant));

});
const updateRestaurant = asyncHandler(async (req, res) => {

    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    };
    restaurant.restaurantname = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    return res
        .status(200).json(
            new ApiResponse(200, "Restaurant updated")
        );
});
const getRestaurantOrder = asyncHandler(async (req, res) => {

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    };
    const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
    return res
        .status(200)
        .json(new ApiResponse(200, orders));
});
const updateOrderStatus = asyncHandler(async (req, res) => {

    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    order.status = status;
    await order.save();
    return res
        .status(200)
        .json(new ApiResponse(200, order.status, "Status updated"));
});
const searchRestaurant = asyncHandler(async (req, res) => {

    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery as string || "";
    const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
    const query: any = {};
    // basic search based on searchText (name ,city, country)
    console.log(selectedCuisines);

    if (searchText) {
        query.$or = [
            { restaurantName: { $regex: searchText, $options: 'i' } },
            { city: { $regex: searchText, $options: 'i' } },
            { country: { $regex: searchText, $options: 'i' } },
        ]
    }
    // filter on the basis of searchQuery
    if (searchQuery) {
        query.$or = [
            { restaurantName: { $regex: searchQuery, $options: 'i' } },
            { cuisines: { $regex: searchQuery, $options: 'i' } }
        ]
    }

    if (selectedCuisines.length > 0) {
        query.cuisines = { $in: selectedCuisines }
    }

    const restaurants = await Restaurant.find(query);

    // return res.status(200).json({
    //     success: true,
    //     data: restaurants
    // });
    return res.status(200).json(new ApiResponse(200, restaurants));
});
const getSingleRestaurant = asyncHandler(async (req, res) => {

    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
        path: 'menu',
        options: { createdAt: -1 }
    });
    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    };
    return res
        .status(200)
        .json(new ApiResponse(200, restaurant));
});

export {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    getRestaurantOrder,
    updateOrderStatus,
    searchRestaurant,
    getSingleRestaurant
};