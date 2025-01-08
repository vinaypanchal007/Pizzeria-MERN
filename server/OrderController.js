const Order = require('./Order');

const saveOrder = async (req, res) => {
  const orderData = req.body;

  if (!orderData.username || !orderData.totalPrice || !orderData.dishes) {
    return res.status(400).json({ message: 'Invalid order data provided.' });
  }

  try {
    const newOrder = new Order({
      username: orderData.username,
      totalPrice: parseFloat(orderData.totalPrice),
      dishes: orderData.dishes.map((dish) => ({
        id: dish.id,
        name: dish.name,
        price: parseFloat(dish.price),
        quantity: dish.quantity,
      })),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: 'Order saved successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error saving order:', error.message);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
};

const getOrdersByUsername = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: 'Username is required to fetch orders.' });
  }

  try {
    const orders = await Order.find({ username });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

module.exports = { saveOrder, getOrdersByUsername };
