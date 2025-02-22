import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/Users/lachitha/Downloads/DS-MicroServices/admin/src/components/AdminOrder.css'

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4002/order/');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    console.log("status:", status);
    try {
      const response = await axios.put('http://localhost:4002/order/orderstatus', {
        _id: orderId,
        status: status,
      });
  
      const data = response.data;
  
      if (data.success) {
        fetchOrders();
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 1); // Adjust the delay if needed
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Order Items</th>
              <th>Status</th>
              <th>Current Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>${order.totalAmount}</td>
                <td>
                  {/* Render order items */}
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        <p>Product ID: {item.productId}</p>
                        <p>Price: ${item.Price}</p>
                        <p>Purchased Quantity: {item.purchasedQty}</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <label htmlFor={`status-${order._id}`}>Status:</label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                      
                    }
                    
                  >
                    <option value="">Select Rank</option>
                    <option value="ordered">ordered</option>
                    <option value="packed">packed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>


                <td>
                  {/* Render order items */}
                  <ul>
                    {order.orderStatus.map((item) => (
                      <li key={item._id}>
                        <p>Order Status: {item.type}</p>
                        
                      </li>
                    ))
                    }
                   

                  </ul>
                </td>


              </tr>
            ))}
            
          </tbody>
        </table>
      )}
    </div>

  );
};

export default OrdersList;
