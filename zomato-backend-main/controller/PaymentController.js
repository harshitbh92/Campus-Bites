const Razorpay = require('razorpay');
const crypto = require('crypto');
const KEY_ID = "rzp_test_zfcJvnDg1SRAdQ";
const KEY_SECRET = "Idd5BrwmWNDvphbopwAbeNAc";

var instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});

const PaymentController = {
    createOrder: (req, res) => {
        const { amount } = req.body;
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: "Unable to create an order"
                })
            } else {
                res.status(200).send({
                    status: true,
                    order
                })
            }
            console.log(order);
        });
    },
    verifyPayment: (req, res) => {
        const { payment_id, order_id, signature } = req.body;

        // generated_signature = hmac_sha256(order_id + "|" + payment_id, KEY_SECRET);
        const payDetails = order_id + "|" + payment_id;
      const generated_signature = crypto
      .createHmac('sha256',KEY_SECRET)
      .update(payDetails.toString())
      .digest('hex');
    //   console.log("generated_signature",generated_signature);
    //   console.log("signature",signature);

        if (generated_signature == signature) {
              console.log("payment is successful");
              res.status(200).send({
                status: true,
                message:"payment is successful"
            })
        }else{
            res.status(500).send({
                status: false,
                message: "Payment Failed"
            })
        }

    }
}

module.exports = PaymentController;