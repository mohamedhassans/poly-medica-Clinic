import Stripe from 'stripe';
import axios from 'axios';

import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
    PATIENTS_BASE_URL,
    BAD_REQUEST_CODE_400,
    SECRET_KEY
} from '../utils/Constants.js';
const stripe = new Stripe(SECRET_KEY);

export const payment = (app) => {

    app.post('/payment/card', async (req, res) => {
        try{
            const total_amount = req.body.paymentAmount;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (total_amount * 100),
                currency: "usd",
                automatic_payment_methods: {
                  enabled: true,
                },
            });
            res.status(OK_STATUS_CODE).send({
                clientSecret: paymentIntent.client_secret,
            });
        }catch(err){
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
    
    app.post('/payment/wallet', async (req, res) => {
        try{
            const amountToPay = req.body.amountToPayByWallet;
            const userId = req.body.userId;
            let amountInWallet = await axios.get(`${PATIENTS_BASE_URL}/${userId}/wallet`);
            if(amountToPay <= amountInWallet){
                amountInWallet = amountInWallet - amountToPay;
                await axios.patch(`${PATIENTS_BASE_URL}/wallet`, {amount : amountInWallet} );
                res.status(OK_STATUS_CODE).send("Payment successful");
            }else{
                res.status(BAD_REQUEST_CODE_400).json("insufficient amount in the wallet");
            }
        }catch(err){
            res.status(ERROR_STATUS_CODE).send({err: err.message, status: ERROR_STATUS_CODE});
        }
    });
};