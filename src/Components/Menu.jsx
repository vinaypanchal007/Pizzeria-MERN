// Menu.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem('token') !==null ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/images');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">No items available.</p>
      </div>
    );
  }

  const handleOrderClick = (pizza) => {
    if (!token) {
      alert('Please login first!!!!');
    }
    else {
      const imageSrc = `data:${pizza.img.contentType};base64,${pizza.img.data}`;
      addToCart({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        image: imageSrc,
      });
    }
  };

  const handleCart = () => {
    if (!token) {
      alert('Please login first!!!!');
    } else {
      navigate('/OrderList');
    }
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((pizza) => {
          const imageSrc = `data:${pizza.img.contentType};base64,${pizza.img.data}`;
          return (
            <div
              key={pizza.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="overflow-hidden">
                <img
                  src={imageSrc}
                  alt={pizza.name}
                  className="w-full h-48 object-cover object-center rounded-t-lg"
                />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {pizza.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  ${pizza.price.toFixed(2)}
                </p>
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:scale-110 focus:outline-none active:bg-blue-900"
                  onClick={() => handleOrderClick(pizza)}
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottom-6 right-6">
        <button
          className="px-6 py-3 bg-red-600 mt-4 text-white rounded-lg text-sm font-medium hover:scale-105 active:bg-red-700"
          onClick={handleCart}
        >
          View Cart
        </button>

      </div>
    </div>
  );
}

export default Menu;
