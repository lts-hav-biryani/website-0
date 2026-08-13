const dotenv = require("dotenv");
const Razorpay = require("../Config/razorpay.js")
const { userOrders } = require("../Models/user.js")
const crypto = require("crypto");
const AppError = require("../Utils/AppError.js");
dotenv.config();
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
        const itemsText = orderDetails.items
            .map(
                (item, index) =>
                    `🍽️ ${index + 1}. ${item.itemId}\n   🔢 Quantity: ${item.itemQuantity}\n   💰 Price: ₹${item.itemPrice}`
            )
            .join("\n\n");

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: `
🚨🚨 NEW ORDER RECEIVED 🚨🚨

━━━━━━━━━━━━━━━━━━

🧾 ORDER DETAILS 


Name : ${orderDetails.address.name}

Phone Number : ${orderDetails.address.phone}

Items: ${itemsText}

Address : ${orderDetails.address.street}, ${orderDetails.address.city} 

━━━━━━━━━━━━━━━━━━

💰 TOTAL: ₹${orderDetails.finalTotal}
PaymentID: ${razorpay_payment_id}

━━━━━━━━━━━━━━━━━━
⏰ Please start preparing the order!`
            }),
        });
        const data = await response.json();
        return res.status(200).json({
            message: "Payment verified successfully !"
        });
    } else {
        return res.status(401).json({
            message: "Invalid Payment"
        })
    }
}

const fetchOrdersController = async (req, res) => {
    const userProfile = req.userProfile;
    const uId = userProfile._id;
    const orders = await userOrders.find({
        userId: uId
    })
    if (!orders) {
        throw new AppError(400, "No Orders exist!");
    }
    return res.status(200).json({
        message: "Orders fetched!",
        orders: { name: orders.name, phoneNumber: orders.phNo, address: orders.address, itemDetails: orders.itemDetails, orderDelivered: orders.orderDelivered, orderConfirmed: orders.orderConfirmed, paymentId: orders.paymentId, orderId: orders.orderId, finalTotal: orders.finalTotal }
    })
}

const webhookController = async (req, res) => {

}
module.exports = { razorpayCreateOrderController, verifyPaymentController, webhookController, fetchOrdersController }