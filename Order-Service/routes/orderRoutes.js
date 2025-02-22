import express from 'express';
import { getOrders, createOrder ,getOrdersItems,getOrdersStatus,changeOrderStatus,getAllOrdersItems } from '../controller/orderController.js';
 

const router = express.Router();

// get all orders
router.get('/:userId', getOrdersItems);
router.get('/orders/:userId', getOrders);
router.get('/orderstatus/:userId', getOrdersStatus);
router.put('/orderstatus', changeOrderStatus);
router.get('/', getAllOrdersItems);


// create a new order
router.post('/', createOrder);

export default router; 