import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const update = asynchandler(async (req, res, next) => {
  const { name, email, username } = req.body;
  const id = req.user._id;
  const finduser = await User.findById(id);
  if (!finduser) {
    return next(new ApiError('User not found', 403));
  }
  const updateduser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email: email.trim(),
      username,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    message: 'User Updated Sucessfully',
    data: { updateduser },
  });
});

export const getme = asynchandler(async (req, res, next) => {
  const id = req.user._id;
  const getuser = await User.findById(id);
  if (!getuser) {
    return next(new ApiError('User not found', 403));
  }
  res.status(201).json({
    message: 'User fetched Successfully',
    data: {
      getuser,
    },
  });
});

export const addfavourite = asynchandler(async (req, res, next) => {
  const id = req.user._id;
  const { _id } = req.body;
  const newuser = await User.findByIdAndUpdate(
    id,
    {
      $addToSet: { favourite: _id },
    },
    { new: true }
  ).populate('favourite');
  res.status(201).json({
    message: 'favourites updated successfully',
    data: newuser,
  });
});

export const removefavourite = asynchandler(async (req, res, next) => {
  const id = req.user._id;
  const { _id } = req.body;
  const newuser = await User.findByIdAndUpdate(
    id,
    { $pull: { favourite: _id } },
    { new: true }
  );
  await newuser.populate('favourite');
  res.status(201).json({
    message: 'favourites updated successfully',
    data: newuser,
  });
});
