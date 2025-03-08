import Fooditem from '../models/fooditemmodel.js';
import Order from '../models/ordermodel.js';
import Rating from '../models/ratingmodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const addreview = asynchandler(async (req, res, next) => {
  const f_id = req.params.id;

  const isorder = await Order.find({
    user: req.user._id,
    status: { $in: ['Delivered', 'Success'] },
    'fooditems._id': f_id,
  });

  if (!isorder) {
    return next(new ApiError('You have to accept the order to review it', 400));
  }
  const existed_review = await Rating.findOne({
    fooditem: f_id,
    user: req.user._id,
  });
  if (existed_review) {
    return next(new ApiError('You have already review it', 400));
  }

  const { rating, review } = req.body;

  if (!rating || !review) {
    return next(new ApiError('You do not enter all the fields', 400));
  }

  const newreview = await Rating.create({
    rating,
    review,
    user: req.user._id,
    fooditem: f_id,
  });

  if (!newreview) {
    return next(new ApiError('Error in creating review', 400));
  }

  res.status(201).json({
    message: 'Rating done successfully',
    data: newreview,
  });
});

export const editreview = asynchandler(async (req, res, next) => {
  const r_id = req.params.id;

  const reqreview = await Rating.findById(r_id);

  if (!reqreview) {
    return next(new ApiError('Review n=Not found to update'));
  }
  const { rating, review } = req.body;

  if (!rating && !review) {
    return next(new ApiError('You do not enter all the fields', 400));
  }

  if (rating) {
    const reqfooditem = await Fooditem.findById(reqreview.fooditem);

    if (!reqfooditem) {
      return next(new ApiError('FoodItem Not found', 400));
    }
    reqfooditem.averageRating =
      (reqfooditem.averageRating * reqfooditem.totalRatings -
        reqreview.rating) /
      (reqfooditem.totalRatings - 1);

    reqfooditem.save();
  }

  const updatedreview = await Rating.findByIdAndUpdate(
    r_id,
    {
      review,
      rating,
    },
    { new: true }
  );

  res.status(201).json({
    message: 'Rating updated Successfully',
    updatedreview,
  });
});

export const deletereview = asynchandler(async (req, res, next) => {
  const r_id = req.params.id;
  const reqreview = await Rating.findById(r_id);
  if (!reqreview) {
    return next(new ApiError('Review not found to delete', 400));
  }

  const reqfooditem = await Fooditem.findById(reqreview.fooditem);
  console.log(reqfooditem);
  console.log(reqreview);
  if (!reqfooditem) {
    return next(new ApiError('FoodItem Not found', 400));
  }
  reqfooditem.averageRating =
    (reqfooditem.averageRating * reqfooditem.totalRatings - reqreview.rating) /
      (reqfooditem.totalRatings - 1) || 0;
  reqfooditem.totalRatings -= 1;
  reqfooditem.save();
  await Rating.findByIdAndDelete(r_id);

  res.status(201).json({
    message: 'Review Deleted Successfully',
  });
});

export const getall = asynchandler(async (req, res, next) => {
  const f_id = req.params.id;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  console.log(f_id);
  
  const foodItem = await Fooditem.findById(f_id);
  console.log(foodItem);
  
  if (!foodItem) {
    return next(new ApiError('Food Item not Found', 400));
  }
  console.log(foodItem);
  console.log(f_id);

  // Count total number of reviews
  const totalReviews = await Rating.countDocuments({ fooditem: f_id });

  const allreviews = await Rating.find({ fooditem: f_id })
    .populate('user')
    .skip((page - 1) * limit)
    .limit(limit);

  const userReview = await Rating.findOne({ fooditem: f_id, user: req.user?._id }).populate('user') || null;

  const totalPages = Math.ceil(totalReviews / limit);

  res.status(201).json({
    message: 'All Review Fetched',
    data: {
      allreviews,
      userReview,
      currentPage: page,
      totalPages: totalPages,
    },
  });
});
