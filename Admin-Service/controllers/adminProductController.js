const Product = require("../models/adminProductModel");
const axios = require("axios");
// get all products
const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get product by id
const getProductbyIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete by id

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  console.log(productId);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    await axios.post(`http://localhost:5000/events`, {
      type: "AdminProductDeleted",
      data: {
        productId,
      },
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProductsController,
  getProductbyIdController,
  deleteProductController,
};
