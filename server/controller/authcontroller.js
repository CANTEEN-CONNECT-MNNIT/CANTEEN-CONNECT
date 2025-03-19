import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';
import User from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Email from '../utils/emailhandler.js';
import * as crypto from 'crypto';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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
  console.log('invoke');
  let { name, email, password, confirmpassword } = req.body;
  email = email.trim().toLowerCase();
  password = password.trim();
  console.log(confirmpassword);
  confirmpassword = confirmpassword.trim();
  //check email password and confiem password are not missing
  if (!email || !password || !confirmpassword) {
    return next(new ApiError('All field are required', 400));
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    return next(new ApiError('User are already exist', 404));
  }
  const uploadedfile = await uploadOnCloudinary(req.file?.path);
  console.log(uploadedfile);
  if (uploadedfile && !uploadedfile.url) {
    return next(new ApiError('Error in image uploaing', 444));
  }
  const newuser = await User.create({
    name,
    email,
    image: uploadedfile?.url || '',
    password,
    confirmpassword,
  });

  console.log(newuser);

  const { acesstoken, refreshtoken } = createrefreshandacesstoken(newuser.id);

  if (!acesstoken || !refreshtoken) {
    return next(new ApiError('Token cannot generated', 402));
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  };

  res
    .cookie('acesstoken', acesstoken, options)
    .cookie('refreshtoken', refreshtoken, options);

  res.status(201).json({
    message: 'User Account created and logged in Succesfully',
    data: {
      user: newuser,
      acesstoken,
      refreshtoken,
    },
  });
});

export const login = asynchandler(async (req, res, next) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();
  password = password.trim();
  if (!email) {
    return next(new ApiError('Please enter email', 400));
  }

  if (!password) {
    return next(new ApiError('Please Enter the password', 400));
  }

  const requser = await User.findOne({ email }).select('+password');

  if (!requser) {
    return next(new ApiError('User Not found Please Enter valid email ', 400));
  }

  if (!(await requser.comparepassword(password))) {
    // console.log(requser);
    return next(new ApiError('Password is incorrect', 400));
  }

  const { acesstoken, refreshtoken } = createrefreshandacesstoken(requser.id);

  if (!acesstoken || !refreshtoken) {
    return next(new ApiError('Token cannot generated', 402));
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  };

  res
    .cookie('acesstoken', acesstoken, options)
    .cookie('refreshtoken', refreshtoken, options);

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

  // console.log('protect middleware is invoked');

  let acesstoken, refreshtoken;
  if (test_token && test_token.startsWith('Bearer')) {
    acesstoken = test_token.split(' ')[1];
    refreshtoken = test_token.split(' ')[2];
  } else {
    acesstoken = req.cookies.acesstoken;
    refreshtoken = req.cookies.refreshtoken;
  }

  // console.log(refreshtoken);

  // console.log('Hello');

  // console.log(acesstoken);

  if (!refreshtoken) {
    return next(new ApiError('Unauthorised user', 401));
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
    return next(new ApiError('You are unauthorised', 401));
  }

  const user = await User.findById(decodedtoken.id);
  // console.log(user);

  if (!user) {
    next(new ApiError('User not found', 401));
  }

  if (await user.ispasswordchanged(decodedtoken.iat)) {
    next(new ApiError('Password is changed you have to login again', 402));
  }

  req.user = user;

  next();
});

export const forgotpassword = asynchandler(async (req, res, next) => {
  //get the email to forgot password
  let { email } = req.body;
  email = email.trim().toLowerCase();
  //check the user is exist or not
  const requser = await User.findOne({ email });
  //if not exist give error
  if (!requser) {
    return next(new ApiError('User not found', 404));
  }

  const resetToken = requser.createResettoken();
  await requser.save({ validateBeforeSave: false });

  try {
    const resetURL = `${process.env.FRONTEND_URL}/${resetToken}`;
    await new Email(requser, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    requser.passwordResetToken = undefined;
    requser.passwordResetExpires = undefined;
    await requser.save({ validateBeforeSave: false });
    return next(
      new ApiError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

export const resetpassword = asynchandler(async (req, res, next) => {
  const { resetToken, password, confirmpassword } = req.body;

  if (!resetToken || !password || !confirmpassword) {
    return next(new ApiError('Please fill all required field', 400));
  }

  console.log(req);

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const requser = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!requser) {
    return next(new ApiError('Token is invalid or expired', 401));
  }

  requser.password = password;
  requser.confirmpassword = confirmpassword;
  requser.passwordResetToken = undefined;
  requser.passwordResetExpires = undefined;
  await requser.save();
  const { acesstoken, refreshtoken } = createrefreshandacesstoken(requser._id);

  //check the acess and refreshtoken is generated or not
  if (!refreshtoken || !acesstoken) {
    return next(new ApiError('token cannot generated', 400));
  }

  //send the cookie
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  };

  res
    .cookie('acesstoken', acesstoken, options)
    .cookie('refreshtoken', refreshtoken, options);
  //return success message
  res.status(201).json({
    message: 'Password reset Succesfully',
    data: {
      acesstoken,
      refreshtoken,
      user: requser,
    },
  });
});

export const updatepassword = asynchandler(async (req, res, next) => {
  const requser = await User.findById(req.user._id).select('+password');

  const { current_password, new_password, confirmpassword } = req.body;

  if (!new_password || !confirmpassword || !current_password) {
    return next(new ApiError('All field are required', 400));
  }
  if (!(await requser.comparedbpassword(current_password))) {
    return next(new ApiError('Current Password is incorrect', 400));
  }

  requser.password = new_password;
  requser.confirmpassword = confirmpassword;
  await requser.save();

  const [acesstoken, refreshtoken] = createacessandrefreshtoken(requser._id);

  //check the acess and refreshtoken is generated or not
  if (!refreshtoken || !acesstoken) {
    return next(new ApiError('token cannot generated', 400));
  }

  //send the cookie
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  };

  res
    .cookie('acesstoken', acesstoken, options)
    .cookie('refreshtoken', refreshtoken, options);
  //return success message
  res.status(201).json({
    message: 'Password updated Successfully',
    data: {
      acesstoken,
      refreshtoken,
      user: requser,
    },
  });
});
export const logout = asynchandler(async (req, res, next) => {
  res.clearCookie('acesstoken').clearCookie('refreshtoken');
  res.status(200).json({ status: 'success' });
});

export const restrict_to = (role) =>
  asynchandler(async (req, res, next) => {
    //get the role of the user
    const user_role = req.user.role;
    //check the user is quthorised to perform action
    if (role !== user_role) {
      return next(new ApiError('You Cannot perform that action', 403));
    }

    //if authorised give permission
    next();
  });
