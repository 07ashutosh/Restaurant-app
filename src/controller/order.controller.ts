import { Order } from "../model/order.model";
import Stripe from 'stripe';
import { Restaurant } from "../model/restaurant.model";
import { asyncHandler } from "../utils/asyncHandeler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponce";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    restaurantId: string
}
type menuItems = {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number
}[]

const getOrders =asyncHandler( async (req, res) => {
        const orders = await Order.find({ user: req.id }).populate('user').populate('restaurant');
        return res
        .status(200)
        .json(
            new ApiResponse(200,orders,'Success')
        );
});

const createCheckoutSesson = asyncHandler(async (req, res) => {
    const checkoutSessonRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(checkoutSessonRequest.restaurantId).populate('menu');
    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' })
    }

    const order = new Order({
        restaurant: restaurant._id,
        user: req.id,
        deliveryDetails: checkoutSessonRequest.deliveryDetails,
        cartItemtems: checkoutSessonRequest.cartItems.map(item => ({
            menuId: item.menuId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
        })),
        status: 'pending'
    });

    //line items
    const menuItems = restaurant.menu;
    const lineItems = createlinearItems(checkoutSessonRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['IN']
        },
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/order/status`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
        metadata: {
            orderId: order._id.toString(),
            images: JSON.stringify((menuItems).map((item: any) => item.image))
        }
    });
    if (!session.url) {
        throw new ApiError(500, 'Unable to create checkout session');
    }
    await order.save();
    return res.status(200).json({
        session
    });

});

const stripeWebhook = asyncHandler(async (req, res) => {
    let event;
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);


    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await Order.findById(session.metadata?.orderId);

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        // Update the order with the amount and status
        if (session.amount_total) {
            order.totalAmount = session.amount_total;
        }
        order.status = "confirmed";

        await order.save();

    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
});

const createlinearItems = (checkoutSessonRequest: CheckoutSessionRequest, menuItems: any) => {
    //create line items
    const lineItems = checkoutSessonRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: any) => item._id === cartItem.menuId);
        if (!menuItem) throw new Error('Menu item not found');
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image]
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity
        }
    })

    //return line items
    return lineItems;
};


export {
    getOrders,
    createCheckoutSesson,
    createlinearItems,
    stripeWebhook
}