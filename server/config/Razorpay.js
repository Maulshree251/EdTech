const razorpay = require('razorpay');

exports.instance = new razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_SECRET
});

