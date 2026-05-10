const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    itemImageLink: {
        type: String,
        required: false
    }, itemTitle: {
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
const careerScehma = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    }
});
const career = mongoose.model("career", careerScehma);
module.exports = { career, menu }