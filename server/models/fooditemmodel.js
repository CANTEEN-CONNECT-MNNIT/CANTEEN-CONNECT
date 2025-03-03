import mongoose from 'mongoose';

const fooditemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    available: {
      type: String,
      enum: ['out_of_stock', 'limited_stock', 'in_stock'],
      default: 'in_stock',
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Canteen',
      required: true,
    },
  },
  { timestamps: true }
);

const Fooditem = mongoose.model('Fooditem', fooditemSchema);

export default Fooditem;
