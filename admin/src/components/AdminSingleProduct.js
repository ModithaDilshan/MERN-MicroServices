import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./SingleProduct.css"; // Import custom CSS file for styling

const SingleProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4006/api/admin/products/getProductbyId/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:4006/api/admin/products/delete/${id}`, {
      data: {
        productId: data.pId,
      },
    });

    alert("Product deleted successfully!");
    navigate(`/`);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='single-product-container'>
      <header className='single-product-header'>
        <h1>Product Details</h1>
      </header>
      <div className='single-product-card'>
        <div className='single-product-image'>
          <img src={data.imageUrl} alt={data.name} />
        </div>
        <div className='single-product-details'>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p>Price: ${data.price}</p>
          <p>Quantity: {data.quantity}</p>
          <p>Category: {data.category}</p>
          <p>Seller: {data.seller}</p>
          <div className='single-product-buttons'>
            <button className='delete-button' onClick={deleteProduct}>
              Delete
            </button>
            <Link to='/' className='back-button'>
              Back to Product List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
