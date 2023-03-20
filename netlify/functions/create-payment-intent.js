require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Essentially this is the main export of the Serverless function
// async function that handles request and response via the event received
exports.handler = async(event) => {
    try {
        console.log("inside stripe");
        const { amount } = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: "inr",
            payment_method_types:["card"]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }
    } catch (error){
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
};