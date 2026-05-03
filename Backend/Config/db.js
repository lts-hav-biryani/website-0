const mongoose = require("mongoose");
async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL_MAIN);
        console.log("Database connected successfully !");
    } catch (error) {
        console.log("Something went wrong at the database level : ", error);
    }
};
module.exports = dbConnection;