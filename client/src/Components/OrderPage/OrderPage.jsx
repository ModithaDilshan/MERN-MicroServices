import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';

const OrdersList = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [allitems, setAllItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userData='))
      ?.split('=')[1];

    if (cookieValue) {
      const userDataObj = JSON.parse(cookieValue);
      setUserData(userDataObj._id);
    }
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/order/orderstatus/${userData}`);
        setOrderStatus(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userData]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/order/${userData}`);
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userData]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/order/orders/${userData}`);
        setAllItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userData]);

  useEffect(() => {
    const storedAllItems = localStorage.getItem('allItems');
    if (storedAllItems) {
      setAllItems(JSON.parse(storedAllItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('allItems', JSON.stringify(allitems));
  }, [allitems]);

  return (
    <div className='container'>
      <h2 className='my-4'>Orders for User {userId}</h2>
      <div className='row'>
        <div className='col-md-12'>
          <h4>All Orders</h4>
          <ul className='list-group'>
            {allitems.map((allitem) => (
              <li className='list-group-item order-item' key={allitem.userId}>
                <div className='order-header'>
                  <p className='order-id'>Order ID: {allitem._id}</p>
                  <p className='order-date'>
                    Order Date: {new Date(allitem.createdAt).toLocaleDateString()}
                  </p>
                  <p className='order-time'>
                    Order Time: {new Date(allitem.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className='order-body'>
                  <p className='order-address'>Address: {allitem.addressId}</p>

                  {allitem.orderStatus.map((ordersta) => (
                    <p className='order-status' key={ordersta.type}>
                      orderStatus: {ordersta.type}
                    </p>
                  ))}

                  <p className='order-amount'>Total Amount: Rs. {allitem.totalAmount}</p>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allitem.items.map((item) => (
                        <tr key={item.productId}>
                          <td>{item.productId}</td>
                          <td>$. {item.Price}</td>
                          <td>{item.purchasedQty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
