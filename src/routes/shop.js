const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validar-jwt");
const {
    allListProduct,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
} = require("../controller/shop");

const shop = Router();

shop.use(validateJWT);

shop.get("/", allListProduct);

shop.get("/:id", getProduct);

shop.post("/", [check("price", "")], createProduct);

shop.put("/:id", updateProduct);

shop.delete("/:id", deleteProduct);

module.exports = crud;
