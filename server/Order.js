const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalPrice: { type: mongoose.Schema.Types.Decimal128, required: true },
  dishes: [dishSchema],
});

module.exports = mongoose.model("Order", orderSchema);
