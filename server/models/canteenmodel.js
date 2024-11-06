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
    College: {
      type: String,
      required: true,
    },
    fooditem: [
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
