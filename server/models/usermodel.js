import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your Name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid Email Adress'],
  },
  password: {
    type: String,
    require: [true, 'Please enter the password'],
    select: false,
    minlength: 8,
  },
  confirm_password: {
    type: String,
    require: [true, 'PLease enter the confirm password'],
    validate: {
      validator: function (p) {
        return p == this.password;
      },
      message: 'Password and confirm password is not same',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  image: {
    type: String,
  },
  passwordchangedat: Date,
  rewardpoint: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['Student', 'Canteen'],
    default: 'Student',
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fooditem',
    },
  ],
  favourite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fooditem',
    },
  ],
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined;
  this.passwordchangedat = Date.now();
  next();
});

userSchema.methods.comparepassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.ispasswordchanged = async function (jwttimestamp) {
  // console.log(this.passwordchangedat.getTime());
  // console.log(jwttimestamp * 1000);
  return parseInt(this.passwordchangedat.getTime() / 1000) > jwttimestamp;
};

userSchema.methods.createResettoken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
