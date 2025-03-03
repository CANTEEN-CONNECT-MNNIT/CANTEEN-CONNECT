import Canteen from '../models/canteenmodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const addcanteen = asynchandler(async (req, res, next) => {
  console.log(req.user);
  const owner = req.user._id;
  const updateduser = await User.findByIdAndUpdate(
    owner,
    { role: 'Canteen' },
    { new: true, runValidators: true }
  );
  if (!updateduser) {
    return next(new ApiError('User is Not found', 401));
  }

  const { name, description, canteenId, phone } = req.body;

  if (!name || !canteenId || !phone) {
    return next(new ApiError('Enter required field', 402));
  }

  const newcanteen = await Canteen.create({
    name,
    description,
    canteenId,
    phone,
    owner,
  });

  if (!newcanteen) {
    return next(new ApiError('Canteen cannot create', 403));
  }

  res.status(201).json({
    message: 'Add Canteen Sucessfully',
    data: {
      newcanteen,
      updateduser,
    },
  });
});

export const updatecanteen = asynchandler(async (req, res, next) => {
  const { name, description, gstin, phone } = req.body;

  const id = req.params.id;

  const reqcanteen = await Canteen.findById(id);

  if (!reqcanteen) {
    return next(new ApiError('Task not found', 403));
  }

  const updatedcanteen = await Canteen.findByIdAndUpdate(
    id,
    { name, description, gstin, phone, owner },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    message: 'Message updated Sucessfully',
    data: {
      updatedcanteen,
    },
  });
});

export const deletecanteen = asynchandler(async (req, res, next) => {
  const id = req.user._id;

  const requser = await User.findById(id);

  if (!requser) {
    return next(new ApiError('User Not Found', 403));
  }

  const c_id = req.params.id;

  const reqcanteen = await Canteen.findById(c_id);

  if (!reqcanteen) {
    return next(new ApiError('Canteen Not found', 401));
  }

  await findByIdAndDelete(id);

  res.status(201).json({
    message: 'Delete canteen Successfully',
  });
});

export const getall = asynchandler(async (req, res, next) => {
  const id = req.user._id;

  const requser = User.findById(id);

  if (!requser) {
    return next(new ApiError('User not found', 403));
  }

  const allcanteen = await Canteen.find({ owner: id });

  res.status(201).json({
    message: 'Canteen fetched sucessfully',
    data: {
      allcanteen,
    },
  });
});

export const getcanteen = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const reqcanteen = await Canteen.findById(id);

  if (!reqcanteen) {
    return next(new ApiError('Canteen not found', 401));
  }

  res.status(201).json({
    message: 'Canteen fetch sucessfully',
    data: {
      reqcanteen,
    },
  });
});
