import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
import Order from '../models/ordermodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addcanteen = asynchandler(async (req, res, next) => {
  console.log(req.user);
  const owner = req.user._id;
  const updateduser = await User.findByIdAndUpdate(
    owner,
    { role: 'Canteen' },
    { new: true, runValidators: true }
  );
  if (!updateduser) {
    return next(new ApiError('User is Not found', 401));
  }

  const {
    name,
    description,
    canteenId,
    phone,
    address,
    openTime,
    closeTime,
    daily_target,
  } = req.body;

  const uploadedfile = await uploadOnCloudinary(req.file?.path);

  if (uploadedfile && !uploadedfile.url) {
    return next(new ApiError('Error in image uploaing', 444));
  }

  if (!name || !canteenId || !phone) {
    return next(new ApiError('Enter required field', 402));
  }

  const newcanteen = await Canteen.create({
    name,
    description,
    canteenId,
    phone,
    address,
    openTime,
    closeTime,
    image: uploadedfile?.url || '',
    owner: req.user._id,
    daily_target,
  });

  if (!newcanteen) {
    return next(new ApiError('Canteen cannot create', 403));
  }

  res.status(201).json({
    message: 'Add Canteen Sucessfully',
    data: {
      newcanteen,
      updateduser,
    },
  });
});

export const updatecanteen = asynchandler(async (req, res, next) => {
  const {
    name,
    description,
    canteenId,
    phone,
    address,
    openingtime: openTime,
    closingtime: closeTime,
    daily_target,
  } = req.body;

  const id = req.params.id;
  console.log(id);
  const reqcanteen = await Canteen.findById(id);

  if (!reqcanteen) {
    return next(new ApiError('Canteen not found', 403));
  }
  let uploadedfile;
  if (req.file) {
    uploadedfile = await uploadOnCloudinary(req.file.path);

    if (!uploadedfile.url) {
      return next(new ApiError('Error in image uploaing', 444));
    }
  }
  const updatedcanteen = await Canteen.findByIdAndUpdate(
    id,
    {
      name,
      description,
      canteenId,
      phone,
      address,
      openTime,
      closeTime,
      image: uploadedfile?.url || reqcanteen.image,
      owner: req.user._id,
      daily_target,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    message: 'Canteen updated Sucessfully',
    data: {
      updatedcanteen,
    },
  });
});

export const deletecanteen = asynchandler(async (req, res, next) => {
  const c_id = req.params.id;

  const reqcanteen = await Canteen.findById(c_id);

  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 401));
  }

  await Canteen.findByIdAndDelete(c_id);

  res.status(201).json({
    message: 'Delete canteen Successfully',
  });
});

export const getall = asynchandler(async (req, res, next) => {
  let allcanteen, trending_items;
  if (req.user.role === 'Student') {
    allcanteen = await Canteen.aggregate([
      {
        $lookup: {
          from: 'fooditems',
          localField: '_id',
          foreignField: 'canteen',
          as: 'fooditems',
        },
      },
      {
        $set: {
          fooditems: {
            $slice: ['$fooditems', 5],
          },
        },
      },
    ]);
    trending_items = await Fooditem.find()
      .sort({ averageRating: -1 })
      .limit(8)
      .populate('canteen');
  } else if (req.user.role === 'Canteen') {
    allcanteen = await Canteen.findOne({ owner: req.user._id }).populate(
      'fooditems'
    );
  }
  res.status(201).json({
    message: 'Canteen fetched sucessfully',
    data: allcanteen,
    trending_items,
  });
});

export const getcanteen = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const reqcanteen = await Canteen.findById(id).populate('fooditems');

  if (!reqcanteen) {
    return next(new ApiError('Canteen not found', 401));
  }

  res.status(201).json({
    message: 'Canteen fetch sucessfully',
    data: {
      reqcanteen,
    },
  });
});

export const dashboard = asynchandler(async (req, res, next) => {
  // Get current date and calculate date ranges
  const nowdate = new Date();
  const onemonthago = new Date();
  onemonthago.setMonth(nowdate.getMonth() - 1);
  const oneweekago = new Date();
  oneweekago.setDate(nowdate.getDate() - 7);
  const onedayago = new Date();
  onedayago.setDate(nowdate.getDate() - 1);

  // Find the canteen associated with the current user
  const canteen = await Canteen.findOne({ owner: req.user._id });
  if (!canteen) {
    return res.status(404).json({ message: 'Canteen not found for the user' });
  }
  const c_id = canteen._id;

  // Aggregation pipeline to get the dashboard data
  const orders = await Order.aggregate([
    {
      $match: {
        canteen: c_id,
      },
    },
    {
      $facet: {
        month: [
          {
            $match: {
              createdAt: { $gte: onemonthago },
            },
          },
          {
            $group: {
              _id: 'month',
              totalmonthrevenue: { $sum: '$total_price' },
              totalmonthsale: { $sum: 1 },
            },
          },
        ],
        week: [
          {
            $match: {
              createdAt: { $gte: oneweekago },
            },
          },
          {
            $group: {
              _id: 'week',
              totalweekrevenue: { $sum: '$total_price' },
              totalweeksale: { $sum: 1 },
            },
          },
        ],
        day: [
          {
            $match: {
              createdAt: { $gte: onedayago },
            },
          },
          {
            $group: {
              _id: 'day',
              totaldayrevenue: { $sum: '$total_price' },
              totaldaysale: { $sum: 1 },
            },
          },
        ],
        peak_hour: [
          {
            $match: {
              createdAt: { $gte: oneweekago },
            },
          },
          {
            $project: {
              hour: { $hour: '$createdAt' },
            },
          },
          {
            $group: {
              _id: '$hour',
              ordercount: { $sum: 1 },
            },
          },
          {
            $sort: { ordercount: -1 },
          },
          {
            $limit: 1,
          },
        ],
      },
    },
  ]);

  // Get the number of food items for the canteen
  const num_fooditems = await Fooditem.countDocuments({ canteen: c_id });

  // Respond with the data
  res.status(200).json({
    message: 'Dashboard data fetched successfully',
    data: {
      orders: orders[0], // Access the first (and only) result from the facet aggregation
      num_fooditems,
    },
  });
});
