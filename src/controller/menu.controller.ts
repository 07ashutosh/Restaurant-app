import { Multer } from "multer";
import { Menu } from "../model/menu.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandeler";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Restaurant } from "../model/restaurant.model";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponce";

const addMenu = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        })
    };
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu: any = await Menu.create({
        name,
        description,
        price,
        image: imageUrl
    });
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
        restaurant.menu.push(menu._id);
        await restaurant.save();
    }

    return res.status(201).json({
        success: true,
        message: "Menu added successfully",
        menu
    });
});



const editMenu = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    const menu = await Menu.findById(id);
    if (!menu) {
        throw new ApiError(404, "Menu not found");
    };
    if (file) {
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        menu.image = imageUrl;
    };
    menu.name = name;
    menu.description = description;
    menu.price = price;
    await menu.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Menu updated successfully")
        );

});

export {
    addMenu,
    editMenu
};

