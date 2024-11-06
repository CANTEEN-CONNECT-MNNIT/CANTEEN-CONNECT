import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Canteen',
    },
    fooditem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fooditem',
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
