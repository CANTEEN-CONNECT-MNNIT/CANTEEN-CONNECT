import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
import ApiError from '../utils/apierror.js';
import Apifeature from '../utils/apifeature.js';
import asynchandler from '../utils/asynchandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const additem = asynchandler(async (req, res, next) => {
  const canteen_id = req.params.c_id;
  const reqcanteen = await Canteen.findById(canteen_id);
  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 401));
  }

  const { name, description, price, image, available } = req.body;

  const uploadedfile = await uploadOnCloudinary(req.file.path);

  if (!uploadedfile.url) {
    return next(new ApiError('Error in image uploaing', 444));
  }

  const olditem = await Fooditem.findOne({
    name,
    description,
    canteen: reqcanteen._id,
    price,
  });

  let newitem = null;

  let updatedcanteen;
  if (olditem) {
    return next(new ApiError('Item are already exist in your canten'));
  } else {
    newitem = await Fooditem.create({
      name,
      description,
      price,
      image: uploadedfile.url,
      available,
      canteen: reqcanteen._id,
    });
    if (!newitem) {
      return next(new ApiError('Cannot add new item', 402));
    }

    updatedcanteen = await Canteen.findByIdAndUpdate(
      reqcanteen._id,
      {
        $addToSet: { fooditems: newitem._id },
      },
      { new: true }
    ).populate('fooditems');
  }
  res.status(201).json({
    message: 'Add item sucessfully',
    data: {
      newitem,
      updatedcanteen,
    },
  });
});

export const getall = asynchandler(async (req, res, next) => {
  let queryobj = req.query;
  let allitems = [];
  console.log(queryobj);
  if (req.user.role === 'Canteen') {
    const reqcanteen = await Canteen.findOne({ owner: req.user._id });
    if (!reqcanteen) {
      return next(new ApiError('Canteen Not found', 404));
    }
    allitems = await Fooditem.find({ canteen: reqcanteen._id });
  } else {
    const applyfilter = new Apifeature(Fooditem.find(), queryobj).filter();

    allitems = await applyfilter.models;
  }
  res.status(201).json({
    message: 'sucess',
    data: {
      allitems,
    },
  });
});

export const getitem = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return next(new ApiError('Item Not found ', 403));
  }

  const reqitem = await Fooditem.findById(id);

  if (!reqitem) {
    return next(new ApiError('Item Not found ', 403));
  }

  res.status(201).json({
    message: 'Item fetch sucessfully',
    data: {
      reqitem,
    },
  });
});

export const deleteitem = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const reqcanteen = await Canteen.findOne({ owner: req.user._id });

  if (!id) {
    return next(new ApiError('Item Not found ', 403));
  }

  const reqitem = await Fooditem.findById(id);

  if (!reqitem) {
    return next(new ApiError('Item Not found ', 403));
  }
  let updatedcanteen;
  await Fooditem.findByIdAndDelete(id);
  updatedcanteen = await Canteen.findByIdAndUpdate(
    reqcanteen._id,
    { $pull: { fooditems: reqitem._id } },
    { new: true }
  );
  res.status(201).json({
    message: 'Item delete sucessfully',
    data: updatedcanteen,
  });
});

export const updateitem = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    return next(new ApiError('Item Not found ', 403));
  }

  const { name, description, price, image, available } = req.body;

  const reqitem = await Fooditem.findById(id);

  if (!reqitem) {
    return next(new ApiError('Item Not found ', 403));
  }
  let uploadedfile;
  if (req.file) {
    uploadedfile = await uploadOnCloudinary(req.file.path);

    if (!uploadedfile.url) {
      return next(new ApiError('Error in image uploaing', 444));
    }
  }
  const updateditem = await Fooditem.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      image: uploadedfile?.url || reqitem.image,
      available,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    message: 'FoodItem updataed Sucessfully',
    data: {
      updateditem,
    },
  });
});
