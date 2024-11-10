import { query } from 'express';
import Canteen from '../models/canteenmodel.js';
import Fooditem from '../models/fooditemmodel.js';
import ApiError from '../utils/apierror.js';
import Apifeature from '../utils/apifeature.js';
import asynchandler from '../utils/asynchandler.js';

export const additem = asynchandler(async (req, res, next) => {
  const canteen_id = req.params.c_id;
  const reqcanteen = await Canteen.findById(canteen_id);
  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 401));
  }

  const { name, description, price, image, available, quantity } = req.body;

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
      image,
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

  const applyfilter = new Apifeature(Fooditem.find(), queryobj);

  res.status(201).json({
    message: 'sucess',
  });
});
