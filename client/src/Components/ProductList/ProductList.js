import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/products/all");
      setData(response.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list-container">
      {data.map((item) => (
        <Link to={`/products/${item._id}`} key={item._id} className="product-card-link">
          <div className="product-card">
            <img src={item.imageUrl} alt={item.name} className="product-image" />
            <div className="product-details">
              <h5 className="product-name">{item.name}</h5>
              <p className="product-price">Price: ${item.price}</p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./ProductList.css";

// const ProductList = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:4001/products/all");
//       setData(response.data);
//     };

//     fetchData();
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='product-list'>
//       {data.map((item) => (
//         <div className='product-list-item' key={item._id}>
//           <Link to={`/products/${item._id}`}>
//             <img src={item.imageUrl} alt={item.name} />
//             <div>
//               <h5>{item.name}</h5>
//               <p>
//                 <span className='price'>Price: ${item.price}</span>
//               </p>
//               <p>
//                 <span className='quantity'>Quantity: {item.quantity}</span>
//               </p>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
