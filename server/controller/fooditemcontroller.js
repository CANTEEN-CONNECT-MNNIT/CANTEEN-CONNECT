import { query } from 'express';
import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
import ApiError from '../utils/apierror.js';
import Apifeature from '../utils/apifeature.js';
import asynchandler from '../utils/asynchandler.js';
import { upload } from './apimiddleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const additem = asynchandler(async (req, res, next) => {
  const canteen_id = req.params.c_id;
  const reqcanteen = await Canteen.findById(canteen_id);
  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 401));
  }

  const { name, description, price, image, available, quantity } = req.body;

  let imagepath = null;

  if (image) {
    upload.single('image');

    const path = req.files.image.path;
    console.log(path);
    if (path) imagepath = await uploadOnCloudinary(path);
  }

  if (!name || !price) {
    return next(new ApiError('Please enter the required field'));
  }

  const olditem = await Fooditem.findOne({
    name,
    description,
    canteen: reqcanteen._id,
    price,
    image,
  });

  let newitem = null;

  if (olditem) {
    olditem.quantity = olditem.quantity + (quantity || 1);
    newitem = olditem;
    olditem.save();
  } else {
    newitem = await Fooditem.create({
      name,
      description,
      price,
      image: imagepath,
      available,
      canteen: reqcanteen._id,
      quantity,
    });

    if (!newitem) {
      return next(new ApiError('Cannot add new item', 402));
    }
  }
  res.status(201).json({
    message: 'Add item sucessfully',
    data: {
      newitem,
    },
  });
});

export const getall = asynchandler(async (req, res, next) => {
  const queryobj = req.query;

  console.log(queryobj);

  const applyfilter = new Apifeature(Fooditem.find(), queryobj).filter();

  const allitems = await applyfilter.models;

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

  if (!id) {
    return next(new ApiError('Item Not found ', 403));
  }

  const reqitem = await Fooditem.findById(id);

  if (!reqitem) {
    return next(new ApiError('Item Not found ', 403));
  }

  await Fooditem.findByIdAndDelete(id);

  res.status(201).json({
    message: 'Item delete sucessfully',
  });
});

export const updateitem = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    return next(new ApiError('Item Not found ', 403));
  }

  const { name, description, price, image, available, quantity } = req.body;

  const reqitem = await Fooditem.findById(id);

  if (!reqitem) {
    return next(new ApiError('Item Not found ', 403));
  }

  const updateditem = await Fooditem.findByIdAndUpdate(
    id,
    { name, description, price, image, available, quantity },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    message: 'Task updataed Sucessfully',
    data: {
      updateditem,
    },
  });
});
