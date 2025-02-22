import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BsArrowLeft } from "react-icons/bs"; // Import the arrow icon from a library
import "./SingleProduct.css"; // Import the CSS file

const SingleProduct = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products/getProductbyId/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="))
      ?.split("=")[1];

    if (cookieValue) {
      const userDataObj = JSON.parse(cookieValue);
      setUserData(userDataObj._id);
    }
  }, []);

  const addToCart = async () => {
    try {
      const userId = Cookies.get("_id");
      console.log(userId);

      await axios.post("http://localhost:4004/cart/cart", {
        userId: userData,
        productId: id,
        quantity: 1,
        price: data.price,
        name: data.name,
      });

      navigate("/cart");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='single-product-card'>
      <button className='back-button' onClick={handleGoBack}>
        <BsArrowLeft className='back-icon' />
      </button>
      <div className='image-container'>
        <img src={data.imageUrl} alt={data.name} />
      </div>
      <div className='product-details'>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <p>Price: ${data.price}</p>
        <p>Quantity: {data.quantity}</p>
        <p>Category: {data.category}</p>
        <p>Seller: {data.seller}</p>
        <div className='button-container'>
          <button className='buy-button' onClick={addToCart}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
