import braintree from 'braintree';

import dotenv from 'dotenv';
import asynchandler from '../utils/asynchandler.js';
import ApiError from '../utils/apierror.js';
import { createorder } from './ordercontroller.js';

dotenv.config({ path: './.env' });
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const generatetoken = (req, res, next) => {
  gateway.clientToken
    .generate()
    .then((response) => {
      res.status(201).json({
        message: 'sucess',
        data: {
          response,
        },
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const processpayment = asynchandler(async (req, res, next) => {
  const { nonce, total_amount } = req.body;

  const resp = await gateway.transaction.sale({
    amount: total_amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true,
    },
  });

  console.log(resp);
  let orderresp;
  if (resp.success === true) {
    orderresp = await createorder(req, res, next);
  } else {
    return next(new ApiError('Payment Failed', 412));
  }

  if (orderresp && orderresp !== true) {
    //process for refund
    const transactionId = resp.transaction.id;
    const transactionDetails = await gateway.transaction.find(transactionId);
    let refundResp;
    if (transactionDetails.status === 'submitted_for_settlement') {
      refundResp = await gateway.transaction.void(transactionId);
    }
    refundResp = await gateway.transaction.refund(transactionId);
    //give error message
    if (refundResp.success) {
      return next(
        new ApiError(
          'Order creation failed. Payment refunded successfully.',
          500
        )
      );
    } else {
      return next(
        new ApiError(
          'Order creation failed. Refund failed! Contact to helpline',
          500
        )
      );
    }
  }
});
