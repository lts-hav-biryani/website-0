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
        unique: true
    },
    addresses: {
        type: Array
    }
});
const userAddresses = mongoose.model("userAddresses", addressSchema);
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    completedOrders: {
        type: Array
    },
    pendingOrders: {
        type: Array
    },
    failedOrders: {
        type: Array
    }
});
const userOrders = mongoose.model("userOrders", orderSchema);
const issuesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    openIssues: {
        type: Array,
    },
    // {issueId:OrderId+1, IssueDescription:"something went wrong", if given issue exists in open issue then give "Kindly wait till the old issue is solved" else Add to open issue)
    closedIssues: {
        type: Array
    },
    pendingIssues: {
        type: Array
    }
});
const userIssues = mongoose.model("userIssues", issuesSchema);
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
const userReviews = mongoose.model("userReviews", reviewsSchema);
module.exports = { userInfo, userIssues, userAddresses, userReviews, userOrders };