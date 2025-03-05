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
    fooditem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fooditem',
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ratingSchema.post('save', async function () {
  const foodItem = await mongoose.model('Fooditem').findById(this.fooditem);
  if (foodItem) {
    foodItem.totalRatings += 1;
    foodItem.averageRating =
      (foodItem.averageRating * (foodItem.totalRatings - 1) + this.rating) /
      foodItem.totalRatings;
    await foodItem.save();
  }
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
