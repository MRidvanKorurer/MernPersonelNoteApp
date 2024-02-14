const mongoose = require("mongoose");

const conn = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successfully");
    } catch (error) {
        console.log(error);
    }
}


module.exports = conn;