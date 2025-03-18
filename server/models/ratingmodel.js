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
  const reqcanteen = await mongoose.model('Canteen').findById(this.canteen);
  if (reqcanteen) {
    reqcanteen.totalRatings += 1;
    reqcanteen.averageRating =
      (reqcanteen.averageRating * (reqcanteen.totalRatings - 1) + this.rating) /
      reqcanteen.totalRatings;
    await reqcanteen.save();
  }
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
