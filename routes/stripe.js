const express = require("express");

const router = express.Router();

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/stripe", (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "gbp"
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

router.get("/stripe", (req, res) => {
    res.status(200).json({
        message: "Test stripe get route 3."
    });
});

module.exports = router;
