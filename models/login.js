const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            // unique: true,
        },
        password: {
            type: String,
        },

    },
    { timestamps: true }
);

const Client = mongoose.model("client", loginSchema)

module.exports = Client;