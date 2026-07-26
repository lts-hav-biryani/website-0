const Razorpay = require("../Config/razorpay.js")
const { userOrders } = require("../Models/user.js")
const crypto = require("crypto");
const razorpayCreateOrderController = async (req, res) => {
    console.log(req.body);
    const { amount } = req.body;
    console.log(amount);
    await Razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
    }).then((order) => {
        return res.status(200).json({
            order,
            message: "Order created !"
        })
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error.description
        })
    })
}
const verifyPaymentController = async (req, res) => {
    const { response, orderDetails } = req.body;
    const userProfile = req.userProfile;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
    if (generatedSignature === razorpay_signature) {
        await userOrders.create({
            userId: userProfile._id,
            orderId: orderDetails.id,
            paymentId: razorpay_payment_id,
            address: {
                street: orderDetails.address.street,
                city: orderDetails.address.city,
                pincode: orderDetails.address.pincode,
            },
            itemDetails: orderDetails.items,
            name: orderDetails.address.name,
            finalTotal: orderDetails.finalTotal,
            phNo: orderDetails.address.phone
        });
        return res.status(200).json({
            message: "Payment verified successfully !"
        });
    } else {
        return res.status(401).json({
            message: "Invalid Payment"
        })
    }
}


const webhookController = async (req, res) => {

}
module.exports = { razorpayCreateOrderController, verifyPaymentController, webhookController }