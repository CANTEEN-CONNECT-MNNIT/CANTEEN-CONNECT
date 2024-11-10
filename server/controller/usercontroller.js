import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

const deletetheuser = asynchandler(async (id) => {
  await User.findByIdAndDelete(id);
});

export const logout = asynchandler(async (req, res, next) => {
  res.clearCookie('acesstoken');
    res.clearCookie('refreshtoken');
    res.status(200).json({ message: 'Logged out successfully' });
});

export const update = asynchandler(async (req, res, next) => {
  const { name, email, password, username } = req.body;
  const id = req.user._id;
  const finduser = await User.findById(id);
  if (!finduser) {
    return next(new ApiError('User not found', 403));
  }
  const updateduser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password,
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

export const deleteme = asynchandler(async (req, res, next) => {
  const id = req.user._id;
  const finduser = await User.findByIdAndDelete(id);
  if (!finduser) {
    return next(new ApiError('Can,t deleted', 403));
  }
  finduser.active = false;
  logout();
  deletetheuser(finduser._id);
 
  res.status(201).json({
    message:"User ddeleted sucessfully"
  })
});
