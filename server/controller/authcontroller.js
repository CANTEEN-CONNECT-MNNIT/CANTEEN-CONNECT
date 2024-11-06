import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';
import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

const createrefreshandacesstoken = (id) => {
  const acesstoken = jwt.sign({ id: id }, process.env.ACESS_TOKEN_STRING, {
    expiresIn: process.env.ACESS_TOKEN_EXPIRE_IN,
  });

  const refreshtoken = jwt.sign({ id: id }, process.env.REFRESH_TOKEN_STRING, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
  });

  return { acesstoken, refreshtoken };
};

export const signup = asynchandler(async (req, res, next) => {
  const { name, email, password, username, college, branch, year } = req.body;
  const user =
    (await User.findOne({ username })) || (await User.findOne({ email }));
  if (user) {
    return next(new ApiError('User are already exist', 404));
  }
  if (!email || !password || !username) {
    return next(new ApiError('Please Enter all the detail', 404));
  }

  const newuser = await User.create({
    name,
    email,
    password,
    username,
  });

  // console.log(newuser);

  const { acesstoken, refreshtoken } = createrefreshandacesstoken(newuser.id);

  if (!acesstoken || !refreshtoken) {
    return next(new ApiError('Token cannot generated', 402));
  }

  res.status(201).json({
    message: 'User Account created Succesfully',
  });
});

export const login = asynchandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    return next(new ApiError('Please enter email or username', 400));
  }

  if (!password) {
    return next(new ApiError('Please Enter the password', 400));
  }

  const requser =
    (await User.findOne({ email }).select('+password')) ||
    (await User.findOne({ username }).select('+password'));

  if (!requser) {
    return next(
      new ApiError('User Not found Please Enter valid email or Username', 400)
    );
  }

  if (!(await requser.comparepassword(password))) {
    // console.log(requser);
    return next(new ApiError('Password is incorrect', 400));
  }

  const { acesstoken, refreshtoken } = createrefreshandacesstoken(requser.id);

  if (!acesstoken || !refreshtoken) {
    return next(new ApiError('Token cannot generated', 402));
  }

  delete requser.password;

  res.status(201).json({
    message: 'User login succesfully',
    data: {
      user: requser,
      acesstoken,
      refreshtoken,
    },
  });
});
