const Order = require('../models/orderModel');

exports.orders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product');
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};
exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};
