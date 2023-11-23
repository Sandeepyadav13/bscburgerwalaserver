import { asyncError } from "../middlewares/errorMiddlewares.js"
import { User } from "../models/User.js"
import { Order } from "../models/Order.js"

export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
        res.status(200).json({
            message: "Logged Out",
        });
    });
};

export const getAdminUsers = asyncError(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        users,
    })
});

export const getAdminStats = asyncError(async (req, res, next) => {
    const usersCount = await User.countDocuments();
    const orders = await Order.find({});

    const preparingOrder = orders.filter((i) => i.orderStatus === "preparing");
    const shippedOrder = orders.filter((i) => i.orderStatus === "shippid");
    const deliveredOrder = orders.filter((i) => i.orderStatus === "Delivered");
    let totalIncome = 0;

    orders.forEach((i) => {
        totalIncome += i.totalAmount;
    });

    res.status(200).json({
        success: true,
        usersCount,
        ordersCount: {
            total: orders.length,
            preparing: preparingOrder.length,
            shipped: shippedOrder.length,
            delivered: deliveredOrder.length,
        },
        totalIncome,
    })
})
