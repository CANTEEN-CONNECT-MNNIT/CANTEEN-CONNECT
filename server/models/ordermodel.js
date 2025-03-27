import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

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
    total_price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseAggregatePaginate);
const Order = mongoose.model('Order', orderSchema);

export default Order;
