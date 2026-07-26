const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
const userInfo = mongoose.model("userInfo", userDataSchema);
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    phNo: {
        type: String,
        required: true,
    },
    address: {
        required: true,
        type: {
            city: String,
            pincode: String,
            street: String
        }
    },
    itemDetails: {
        required: true,
        type: [{
            itemId: String,
            itemPrice: String,
            itemQuantity: String
        }]
    },
    finalTotal: {
        required: true,
        type: String
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    orderConfirmed: {
        type: Boolean,
        default: false
    },
    orderDelivered: {
        type: Boolean,
        default: false
    }
});
const userOrders = mongoose.model("userOrders", orderSchema);
module.exports = { userInfo, userOrders };