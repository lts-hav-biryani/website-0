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
    goldMember: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});
const userInfo = mongoose.model("userInfo", userDataSchema);
const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    address: [
        {
            receiverName: {
                type: String,
                required: true
            },
            receiverNumber: {
                type: String,
                required: true
            },
            streetName: {
                type: String,
            },
            cordinates: {
                lat: String,
                long: String
            },
            city: {
                type: String,
            },
            state: {
                type: String,
                default: "Karnataka"
            },
            pincode: {
                type: String,
            }
        }
    ]
});
const userAddresses = mongoose.model("userAddresses", addressSchema);
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    orders: [
        {
            orderId: { type: String, unique: true }, orderTitle: String, orderPrice: String, orderStatus: { type: String }, paymentMode: String, paymentDone: { type: Boolean, default: false }, createdAt: {
                type: Date, default: Date.now
            }
        }
    ]
});
const userOrders = mongoose.model("userOrders", orderSchema);
const reviewsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    review: {
        type: Array
    }
});
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    expiresAt: {
        type: Date,
        expires: 0
    },
    verified: {
        type: Boolean,
        default: false
    }
})
const userReviews = mongoose.model("userReviews", reviewsSchema);
const otp = mongoose.model("otp", otpSchema)
module.exports = { userInfo, userAddresses, userReviews, userOrders, otp };