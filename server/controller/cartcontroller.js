import Fooditem from '../models/fooditemmodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const getcart = asynchandler(async (req, res, next) => {
  const id = req.user._id;

  const carts = await User.findById(id).populate('cart');
  const allitem = carts?.cart || [];
  res.status(201).json({
    message: 'fetch cart Successfully',
    data: allitem,
  });
});

export const addincart = asynchandler(async (req, res, next) => {
  const id = req.user._id;

  const f_id = req.params.id;
  console.log(f_id);
  const reqitem = await Fooditem.findById(f_id);

  if (!reqitem) {
    return next(new ApiError('Item not found', 403));
  }
  const requser = await User.findByIdAndUpdate(
    id,
    {
      $addToSet: { cart: f_id },
    },
    { new: true }
  ).populate('cart');

  res.status(201).json({
    message: 'Iten Add in cart succesfully',
    data: requser,
  });
});

export const deleteincart = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.user._id;
  const reqitem = await Fooditem.findById(id);
  if (!reqitem) {
    return next(new ApiError('Food Item is not available', 404));
  }

  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    { $pull: { cart: id } },
    { new: true }
  ).populate('cart');

  if (!updatedUser) {
    return next(new ApiError('User not found', 404));
  }

  res.status(200).json({
    message: 'Item removed from cart successfully',
    data: updatedUser,
  });
});
