import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fooditem',
          required: true,
        },
        selectedQuantity: {
          type: Number,
          min: 1,
          required: true,
        },
        quantityType: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
