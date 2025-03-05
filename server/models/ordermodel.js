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
      enum: [
        'Pending',
        'Preparing',
        'Ready for pickup',
        'Delivered',
        'Success',
      ],
      default: 'Pending',
    },
    fooditems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fooditem',
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        price: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
