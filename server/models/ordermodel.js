import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready for pickup', 'Delivered', 'Sucess'],
      default: 'Sucess',
    },
    fooditems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fooditem',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
