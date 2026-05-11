const { userOrders } = require("../../Models/user");
const asyncHandler = require("../../Utils/AsyncHanlder");
const completedOrdersController = asyncHandler(async (req, res) => {
    const user = req.userProfile;
    const ordersRecord = await userOrders.find({ userId: user_id, "orders.orderStatus": "completed" });
    if (!ordersRecord) {
        throw new Error(400, "No completed orders found !")
    }
    return res.status(200).json({
        orders: ordersRecord,
        status: true,
        message: "Completed orders fetched successfully !"
    })
});
const pendingOrdersController = asyncHandler(async (req, res) => {
    const user = req.userProfile;
    const ordersRecord = await userOrders.find({ userId: user_id, "orders.orderStatus": "pending" });
    if (!ordersRecord) {
        throw new Error(400, "No pending orders found !")
    }
    return res.status(200).json({
        orders: ordersRecord,
        status: true,
        message: "Pending orders fetched successfully !"
    })
});
const failedOrdersController = asyncHandler(async (req, res) => {
    const user = req.userProfile;
    const ordersRecord = await userOrders.find({ userId: user_id, "orders.orderStatus": "failed" });
    if (!ordersRecord) {
        throw new Error(400, "No failed orders found !")
    }
    return res.status(200).json({
        orders: ordersRecord,
        status: true,
        message: "Failed orders fetched successfully !"
    })
});
const placeOrder = asyncHandler(async (req, res) => {
    const myObj = {
        userId: "asijasfs",
        orders: [{ itemId: "ASas68", itemPrice: "adas", itemTitle: "aadasd", itemPrice: "Adas", itemQuantity: "Asda", paymentMode: "UPI" }, { itemId: "ASas68", itemPrice: "adas", itemTitle: "aadasd", itemPrice: "Adas", itemQuantity: "Asda", paymentMode: "UPI" }],
        totalBill:599
    }
})
module.exports = { completedOrdersController, failedOrdersController, pendingOrdersController };