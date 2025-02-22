//const Cart = require('../model/cartmodel');
import axios from "axios";
import Cart from "../model/cartmodel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price, name } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If cart does not exist, create a new cart
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      // If the product already exists, update the quantity and price
      existingProduct.quantity += quantity;
    } else {
      // If the product does not exist, add a new item to the cart
      cart.items.push({ productId, quantity, price, name });
    }

    // Add total to each item
    cart.items = cart.items.map((item) => {
      const total = item.quantity * item.price;
      return { ...item, total };
    });

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    const items = cartItems[0].items;
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const quantity = req.body.quantity;
    console.log("quantity", quantity);

    await axios.post("http://localhost:5001/events", {
      type: "CardDeleted",
      data: {
        userId,
        productId,
        quantity,
      },
    });

    const result = await Cart.updateOne(
      { userId },
      { $pull: { items: { productId } } }
    );
    if (result == 1) {
      getCart(req, res); // Call getCart to update the cart after item removal
    } else {
      getCart(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity, action } = req.body;

    await axios.post("http://localhost:5001/events", {
      type: "QuntityUpdated",
      data: {
        userId,
        productId,
        quantity,
        action,
      },
    });
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return res.status(404).send("Item not found in the cart");
    }

    cart.items[itemIndex].quantity = quantity;

    cart.items[itemIndex].total = cart.items[itemIndex].price * quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export { addToCart, getCart, updateCartQuantity, removeFromCart };
