import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';
import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

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
  const { name, email, password, username } = req.body;
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

  newuser.password = undefined;

  res.status(201).json({
    message: 'User Account created Succesfully',
    data: {
      user: newuser,
      acesstoken,
      refreshtoken,
    },
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

export const protect = asynchandler(async (req, res, next) => {
  const test_token = req.headers.authorization;

  console.log('protect middleware is invoked');

  let acesstoken, refreshtoken;
  if (test_token && test_token.startsWith('Bearer')) {
    acesstoken = test_token.split(' ')[1];
    refreshtoken = test_token.split(' ')[2];
  } else {
    acesstoken = req.cookies.acesstoken;
    refreshtoken = req.cookies.refreshtoken;
  }

  console.log(refreshtoken);

  console.log('Hello');

  console.log(acesstoken);

  if (!acesstoken || !refreshtoken) {
    return next(new ApiError('You have to login again or sign up', 400));
  }

  let decodedtoken = await promisify(jwt.verify)(
    acesstoken,
    process.env.ACESS_TOKEN_STRING
  );

  // console.log(decodedtoken);

  if (!decodedtoken) {
    decodedtoken = await promisify(jwt.verify)(
      refreshtoken,
      process.env.REFRESH_TOKEN_STRING
    );
  }

  if (!decodedtoken) {
    return next(new ApiError('You are unauthorised', 400));
  }

  const user = await User.findById(decodedtoken.id);
  // console.log(user);

  if (!user) {
    next(new ApiError('User not found', 400));
  }

  if (await user.ispasswordchanged(decodedtoken.iat)) {
    next(new ApiError('Password is changed you have to login again', 402));
  }

  req.user = user;

  next();
});
