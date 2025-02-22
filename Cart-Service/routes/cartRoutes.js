import express from "express";
const router = express.Router();

//const cartController = require('../controller/cartController');
import {addToCart,getCart,updateCartQuantity,removeFromCart}  from "../controller/cartController.js";

router.post('/cart', addToCart);
router.get('/cart/:userId', getCart);
router.put('/cart/:userId/:productId', updateCartQuantity);
router.delete('/cart/:userId/:productId', removeFromCart);


export default router;
