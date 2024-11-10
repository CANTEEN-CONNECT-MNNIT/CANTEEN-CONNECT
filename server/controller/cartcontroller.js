import Fooditem from '../models/fooditemmodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const getcart = asynchandler(async (req, res, next) => {
  const id = req.user;

  const cart = await User.findById(id).populate('FoodItem');

  res.status(201).json({
    message: 'fetch cart Suceefully',
    data: {
      cart,
    },
  });
});

export const addincart = asynchandler(async (req, res, next) => {
  const id = req.user._id;

  const f_id = req.param.id;

  const reqitem = await Fooditem.findById(f_id);

  if (!reqitem) {
    return next(new ApiError('Item not found', 403));
  }

  const requser = await User.findById(id);

  if (!requser) {
    return next(new ApiError('User Not found', 403));
  }

  requser.cart.push(f_id);

  requser.save();

  const carts = requser.cart.populate();

  res.status(201).json({
    message: 'Iten Add in cart succesfully',
    data: {
      carts,
    },
  });
});

export const deleteincart = asynchandler(async (req, res, next) => {});

export const createorder = asynchandler(async (req, res, next) => {});
