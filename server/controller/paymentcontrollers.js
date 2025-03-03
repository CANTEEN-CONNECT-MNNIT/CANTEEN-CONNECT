import braintree from 'braintree';

import dotenv from 'dotenv';

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

export const processpayment = (req, res, next) => {
  const { nonce, total_amount } = req.body;

  gateway.transaction
    .sale({
      amount: total_amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    })
    .then((response) =>
      res
        .status(201)
        .json({
          data: {
            response,
          },
        })
        .catch((error) => {
          res.status(404).json({
            message: unsucessful,
            error: {
              error,
            },
          });
        })
    );
};
// export default gateway;
