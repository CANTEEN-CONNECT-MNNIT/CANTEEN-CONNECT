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

  let requser = await User.findById(id);

  if (!requser) {
    return next(new ApiError('User Not found', 403));
  }

  console.log(requser);

  requser.cart.push(f_id);
  requser.save();

  res.status(201).json({
    message: 'Iten Add in cart succesfully',
    data: requser.cart,
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
  );

  if (!updatedUser) {
    return next(new ApiError('User not found', 404));
  }

  if (updatedUser.cart.length === (await User.findById(user_id)).cart.length) {
    return next(new ApiError('Food item was not in the cart', 404));
  }

  res.status(200).json({
    message: 'Item removed from cart successfully',
    data: { cart: updatedUser.cart },
  });
});
