const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    itemImageLink: {
        type: String,
        required: false
    },
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    itemTitle: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: false
    },
    itemPrice: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    couponCode: {
        type: String,
        required: false
    }
});
const menu = mongoose.model("menu", menuSchema);
module.exports =  menu; 