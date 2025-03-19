import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
import Rating from '../models/ratingmodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const addreview = asynchandler(async (req, res, next) => {
  const c_id = req.params.id;

  // const isorder = await Order.find({
  //   user: req.user._id,
  //   status: { $in: ['Delivered', 'Success'] },
  //   canteen: c_id,
  // });

  // if (!isorder) {
  //   return next(new ApiError('You have to accept the order to review it', 400));
  // }
  // const existed_review = await Rating.findOne({
  //   fooditem: f_id,
  //   user: req.user._id,
  // });
  // if (existed_review) {
  //   return next(new ApiError('You have already review it', 400));
  // }

  const { rating, review } = req.body;

  // console.log({ rating, review });

  if (!rating || !review) {
    return next(new ApiError('You do not enter all the fields', 400));
  }

  const newreview = await Rating.create({
    rating,
    review,
    user: req.user._id,
    canteen: c_id,
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

  console.log({ rating, review });

  if (rating) {
    const reqcanteen = await Canteen.findById(reqreview.canteen);

    if (!reqcanteen) {
      return next(new ApiError('Canteen Not found', 400));
    }
    console.log({
      av: reqcanteen.averageRating,
      tt: reqcanteen.totalRatings,
      rr: reqreview.rating,
    });
    reqcanteen.averageRating =
      (reqcanteen.averageRating * reqcanteen.totalRatings - reqreview.rating) /
        (reqcanteen.totalRatings - 1) || 0;

    reqcanteen.save();
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

  const reqcanteen = await Canteen.findById(reqreview.canteen);
  console.log(reqcanteen);
  console.log(reqreview);
  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 400));
  }
  reqcanteen.averageRating =
    (reqcanteen.averageRating * reqcanteen.totalRatings - reqreview.rating) /
      (reqcanteen.totalRatings - 1) || 0;
  reqcanteen.totalRatings -= 1;
  reqcanteen.save();
  await Rating.findByIdAndDelete(r_id);

  res.status(201).json({
    message: 'Review Deleted Successfully',
  });
});

export const getall = asynchandler(async (req, res, next) => {
  const c_id = req.params.id;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const reqcanteen = await Canteen.findById(c_id);

  if (!reqcanteen) {
    return next(new ApiError('Canteen not Found', 400));
  }

  const totalReviews = await Rating.countDocuments({ canteen: c_id });

  const allreviews = await Rating.find({ canteen: c_id })
    .populate({ path: 'user', select: 'name image' })
    .sort({ [`${req.user?.role === 'Canteen' ? 'rating' : 'updatedAt'}`]: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const userReview =
    (await Rating.findOne({ canteen: c_id, user: req.user?._id }).populate({
      path: 'user',
      select: 'name image',
    })) || null;

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

export const fooditemrating = asynchandler(async (req, res, next) => {
  const { fooditem_ratings } = req.body;
  if (!fooditem_ratings) {
    return next(new ApiError('Cannot get the data', 404));
  }
  await Promise.all(
    fooditem_ratings.map(async ({ _id, rating }) => {
      const reqfooditem = await Fooditem.findById(_id);

      if (!reqfooditem) {
        throw new ApiError(`Food Item with ID ${_id} not found`, 404);
      }

      reqfooditem.totalRatings += 1;

      if (isNaN(reqfooditem.averageRating)) {
        reqfooditem.averageRating = 0;
      }
      reqfooditem.averageRating =
        ((reqfooditem.averageRating || 0) * (reqfooditem.totalRatings - 1) +
          rating) /
        reqfooditem.totalRatings;

      await reqfooditem.save();
    })
  );

  res.status(201).json({
    message: 'Food item rated sucessfully',
  });
});
