import Fooditem from '../models/fooditemmodel.js';
import Order from '../models/ordermodel.js';
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

export const deleteincart = asynchandler(async (req, res, next) => {
  const id = req.param.id;
  const user_id = req.user._id;
  const reqitem = await Fooditem.findById(id);
  if (!reqitem) {
    return next(new ApiError('Food Item is not available', 403));
  }

  const requser = await User.findById(user_id);

  if (!requser) {
    return next(new ApiError('User is not available', 403));
  }

  const newcart = requser.cart.filter((f_id) => f_id !== id);

  if (newcart?.length === requser.cart?.length) {
    return next(new ApiError('food item is not available', 403));
  }

  requser.cart = newcart;

  requser.save();

  res.status(201).json({
    message: 'Remove cart Sucessfully',
    data: {
      newcart,
    },
  });
});

export const createorder = asynchandler(async (req, res, next) => {
  const user_id = req.user._id;

  const requser = await User.findById(id);

  if (!requser) {
    return next(new ApiError('User not found', 403));
  }

  requser.orders = requser.cart.map(async (f_id) => {
    const reqitem = await Fooditem.findOne(f_id[0]);
    if (!reqitem) {
      return next(new ApiError('Some Food Item not found', 401));
    }

    const updateditems = await Fooditem.findByIdAndUpdate(
      f_id[0],
      { quantity: quantity - f_id[1] },
      { new: true, runValidators: true }
    );

    const neworder = await Order.create({
      user: user_id,
      fooditems: f_id[0],
      quantity: f_id[1],
    });

    return neworder._id;
  });
  ///add a middleware which tell us order is sucess or not
  requser.cart = [];
  requser.save();

  res.status(201).json({
    message: 'Create order Sucessfully',
    data: requser.orders,
  });
});
