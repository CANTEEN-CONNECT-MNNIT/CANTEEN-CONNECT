import mongoose from 'mongoose';

const canteenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    canteenId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openTime: { type: String },
    closeTime: { type: String },
    fooditems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fooditem',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Canteen = mongoose.model('Canteen', canteenSchema);

export default Canteen;
