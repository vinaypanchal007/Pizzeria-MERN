// OrderList.js
import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function OrderList() {
  const { cart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const getUsernameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.username;
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return null;
  };

  const handleQuantityChange = (index, change) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q, i) => (i === index ? Math.max(1, q + change) : q))
    );
  };

  const finalTotalPrice = cart.reduce((total, item, index) => {
    return total + item.price * quantities[index];
  }, 0);

  const username = getUsernameFromToken();

  const orderData = {
    username,
    totalPrice: finalTotalPrice,
    dishes: cart.map((item, index) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantities[index],
      image: item.image,
    })),
  };

  const handleConfirmOrder = async () => {
    if (!username) {
      alert('You must be logged in to confirm your order.');
      return;
    }
  
    try {
      await axios.post('http://localhost:8000/saveorder', orderData);
      alert(`Order Confirmed! Total Amount: $${finalTotalPrice.toFixed(2)}`);
      localStorage.removeItem('cart');
      cart.length = 0;
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col gap-6 p-6">
      {cart.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-6">
            {cart.map((item, index) => {
              const quantity = quantities[index];
              const totalPrice = item.price * quantity;

              return (
                <div
                  key={index}
                  className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-md p-4"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-800 mb-4 font-semibold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      -
                    </button>
                    <span className="text-gray-800 font-medium">{quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Final Total: ${finalTotalPrice.toFixed(2)}
            </h2>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </>
      ) : (
        <p className="w-full text-center text-lg text-gray-700">
          Your cart is empty.
        </p>
      )}
    </div>
  );
}

export default OrderList;
