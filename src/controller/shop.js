const { request, response } = require("express");
const Product = require("../models/product");

const allListProduct = async (req = request, res = response) => {
    try {
        const { price, title, imageProduct, description } = req.body;

        let user = await Product.findOne({ title });

        if (user) {
            return res.status(200).json({
                ok: false,
                msg: 'the product already exists, do you want to update the stock ?'
            });
        };

        user = new Product(req.body);




    } catch (error) {

    }
};

const getProduct = async (req = request, res = response) => {
    try {
    } catch (error) { }
};

const createProduct = async (req = request, res = response) => {
    try {
    } catch (error) { }
};

const updateProduct = async (req = request, res = response) => {
    try {
    } catch (error) { }
};

const deleteProduct = async (req = request, res = response) => {
    try {
    } catch (error) { }
};

module.exports = {
    allListProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
};
