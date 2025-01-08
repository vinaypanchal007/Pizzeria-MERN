import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  let username = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`http://localhost:8000/orders?username=${username}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border border-gray-300 p-6 mb-8 rounded-lg bg-gray-100">
            <h3 className="text-xl font-semibold mb-4">
              Total Price: CHF {parseFloat(order.totalPrice.$numberDecimal).toFixed(2)}
            </h3>
            <div className="flex flex-wrap gap-6">
              {order.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="border border-gray-200 rounded-lg p-4 w-48 bg-white shadow-md"
                >
                  <h4 className="text-lg font-medium mb-2">{dish.name}</h4>
                  <p className="text-gray-700">
                    Price: CHF {parseFloat(dish.price.$numberDecimal).toFixed(2)}
                  </p>
                  <p className="text-gray-700">Quantity: {dish.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
