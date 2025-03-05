import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
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

  const { name, description, canteenId, phone, address, openTime, closeTime } =
    req.body;

  const uploadedfile = await uploadOnCloudinary(req.file.path);

  if (!uploadedfile.url) {
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
    image: uploadedfile.url,
    owner: req.user._id,
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
