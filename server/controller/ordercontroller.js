import Order from '../models/ordermodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const getall = asynchandler(async (req, res, next) => {
  const user_id = req.user._id;

  const requser = await User.findById(user_id);

  if (!requser) {
    return next(new ApiError('User Not Found', 403));
  }

  const allorders = await Order.find({ user: user_id });

  return res.status(201).json({
    message: 'All Order fetched Sucessfully',
    data: {
      allorders,
    },
  });
});
