import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4006/api/admin/products/");
      setData(response.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bigbox'>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className='product-row' key={item._id}>
              <td>
                <Link to={`/product/${item._id}`}>
                  <h5>{item.name}</h5>
                </Link>
              </td>
              <td>
                <span className='price'>${item.price}</span>
              </td>
              <td>
                <span className='quantity'>{item.quantity}</span>
              </td>
              <td>
                <Link to={`/product/${item._id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
