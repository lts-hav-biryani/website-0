const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    orderImageLink: {
        type: String,
        required: false
    }, orderTitle: {
        type: String,
        required: true
    },
    orderDescription: {
        type: String,
        required: false
    },
    orderPrice: {
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