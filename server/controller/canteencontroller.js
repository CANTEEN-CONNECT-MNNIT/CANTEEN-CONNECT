import Canteen from '../models/canteenmodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const addcanteen = asynchandler(async (req, res, next) => {
  console.log(req.user);
  const owner = req.user.id;
  const requser = await User.findById(owner);
  if (!requser) {
    return next(new ApiError('User is Not found', 401));
  }

  const { name, description, college } = req.body;

  if (!name || !college) {
    return next(new ApiError('Eneter required field', 402));
  }

  const newcanteen = await Canteen.create({
    name,
    description,
    college,
    owner,
  });

  if (!newcanteen) {
    return next(new ApiError('Canteen cannot create', 403));
  }

  res.status(201).json({
    message: 'Add Canteen Sucessfully',
    data: {
      newcanteen,
    },
  });
});
