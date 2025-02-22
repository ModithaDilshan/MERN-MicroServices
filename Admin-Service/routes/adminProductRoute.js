const express = require("express");

// controller functions
const {
  getAllProductsController,
  getProductbyIdController,
  deleteProductController,
} = require("../controllers/adminProductController.js");

const router = express.Router();

// login route
router.get("/", getAllProductsController);

//get product by id
router.get("/getProductbyId/:id", getProductbyIdController);

//delete product by id
router.delete("/delete/:id", deleteProductController);

module.exports = router;
