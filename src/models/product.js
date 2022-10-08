const { Schema, model } = require("mongoose");

const product_schema = Schema({
    price: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    imageProduct: {
        type: String,
        default: "",
    },
    stock: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: "",
    },
});

module.exports = model("product", product_schema);
