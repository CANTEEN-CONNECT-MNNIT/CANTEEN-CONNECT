import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Canteen',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready for pickup', 'Delivered'],
      default: 'Pending',
    },
    fooditems: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Fooditem', required: true },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
