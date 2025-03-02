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
      type: Boolean,
      default: true,
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Canteen',
      required: true,
    },
    quantityOptions: [
      {
        label: {
          type: String,
          required: true,
        },
        multiplier: {
          type: Number,
          required: true,
          min: 0.5, // For half plate
        },
      },
    ],
  },
  { timestamps: true }
);

const Fooditem = mongoose.model('Fooditem', fooditemSchema);

export default Fooditem;
