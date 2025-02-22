import Order from '../model/ordermodel.js';

// get all orders
const getOrdersItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the given user ID" });
    }
    const items = orders[0].items;
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllOrdersItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the given user ID" });
    }
    const items = orders;
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    
     res.json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrdersStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    const items = orders[0].orderStatus[0];
     res.json(items);
     
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// const getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cartItems = await Cart.find({ userId });
//     const items = cartItems[0].items;
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// };

// create a new order
const createOrder = async (req, res) => {
  const { userId, addressId, totalAmount, items, paymentStatus, paymentType, orderStatus } = req.body;

  const newOrder = new Order({
    userId,
    addressId,
    totalAmount,
    items,
    paymentStatus,
    paymentType,
    orderStatus,
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


const changeOrderStatus = async (req, res) => {
  const { _id, status } = req.body;

  try {
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Find the current order status to update
    const currentOrderStatus = order.orderStatus.find(
      (statusItem) => statusItem.isCompleted === false
    );

    if (!currentOrderStatus) {
      return res.status(400).json({ error: 'Order already completed' });
    }

    // Update the order status
    currentOrderStatus.type = status;
    currentOrderStatus.isCompleted = false;
    currentOrderStatus.date = new Date();

    // Save the updated order
    await order.save();

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { getOrders, createOrder ,getOrdersItems,getOrdersStatus, changeOrderStatus,getAllOrdersItems };