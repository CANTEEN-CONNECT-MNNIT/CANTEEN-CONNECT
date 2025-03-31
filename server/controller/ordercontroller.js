import Canteen from '../models/canteenmodel.js';
import Order from '../models/ordermodel.js';
import User from '../models/usermodel.js';
import ApiError from '../utils/apierror.js';
import asynchandler from '../utils/asynchandler.js';

export const getall = asynchandler(async (req, res, next) => {
  let allorders, pendingcount;
  let totalPages=0;
  let totalOrders=0;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  if (req.user.role === 'Student') {
    const user_id = req.user._id;

    const requser = await User.findById(user_id);

    if (!requser) {
      return next(new ApiError('User Not Found', 403));
    }

    allorders = await Order.find({ user: user_id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(
      'canteen fooditems._id'
    );

    totalOrders = await Order.countDocuments({ user: user_id });
    totalPages = Math.ceil(totalOrders / limit);

    pendingcount = await Order.countDocuments({
      status: { $in: ['Pending', 'Preparing', 'Ready for pickup'] },
      user: user_id,
    });
  } else {
    const reqcanteen = await Canteen.findOne({ owner: req.user._id });
    if (!reqcanteen) {
      return next(new ApiError('Canteen Not found', 404));
    }
    allorders = await Order.find({ canteen: reqcanteen._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('canteen fooditems._id')
      .populate({ path: 'user', select: 'name' });
    
    totalOrders = await Order.countDocuments({ canteen: reqcanteen._id });
    totalPages = Math.ceil(totalOrders / limit);

    pendingcount = await Order.countDocuments({
      status: { $in: ['Pending', 'Preparing', 'Ready for pickup'] },
      canteen: reqcanteen._id,
    });
  }
  return res.status(201).json({
    message: 'All Order fetched Sucessfully',
    data: {
      allorders,
      totalPages,
      pendingcount,
      totalOrders,
    }
  });
});

export const createorder = asynchandler(async (req, res, next) => {
  const { allitemsbycanteen } = req.body;
  if (!allitemsbycanteen || !allitemsbycanteen.length) {
    return false;
  }

  // allitemsbycanteen.forEach((element) => {
  //   console.log(element.fooditems);
  // });
  const orders = await Promise.all(
    allitemsbycanteen.map((eachcanteenorder) => {
      const total_price = eachcanteenorder.fooditems.reduce((acc, cur) => {
        return acc + (cur.price*cur.quantity);
      }, 0);
      return Order.create({
        user: req.user._id,
        canteen: eachcanteenorder.canteenId,
        fooditems: eachcanteenorder.fooditems,
        total_price,
      });
    })
  );

  req.user.cart = [];
  await req.user.save({ validateBeforeSave: false });
  res.status(201).json({
    message: 'success',
  });
});

export const updateorder = asynchandler(async (req, res, next) => {
  const order_id = req.params.id;
  // console.log(order_id);
  const reqorder = await Order.findById(order_id);
  // console.log(reqorder);
  if (!reqorder) {
    return next(new ApiError('Order not found', 404));
  }

  const { status } = req.body;
  if (!status) {
    return next(
      new ApiError('Only change the status and it must be given', 411)
    );
  }

  if(status!=='Success' && req.user.role==='Student'){
    return next(new ApiError('You Cannot perform that action', 403));
  }
  const updateorder = await Order.findByIdAndUpdate(
    order_id,
    { status },
    { new: true }
  );

  res.status(201).json({
    message: 'order updated successfully',
    data: updateorder,
  });
});
