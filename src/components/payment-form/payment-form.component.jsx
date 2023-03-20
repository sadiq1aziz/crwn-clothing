import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentForm, PaymentFormContainer } from "./payment-form.styles";

const Payment = () => {
    const elements = useElements();
    const stripe = useStripe();
    const stripeAmount = useSelector(selectCartTotal);
    const stripeUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); 

    const paymentHandler = async(event) => {
        event.preventDefault();
        if ( !elements || !stripe ){
            return;
        } 
        const response = await fetch("/.netlify/functions/create-payment-intent", {
           method: 'post',
           headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify({amount: stripeAmount*100})
        }).then(res => res.json());
        

        const { paymentIntent }  = response;
        const {client_secret } = paymentIntent;
        setIsProcessingPayment(true);
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: stripeUser ? stripeUser.displayName : 'Guest'
                }   
            }
        });
        setIsProcessingPayment(false);
        if (paymentResult.error){
            console.log(paymentResult.error);
            alert("Error encountered while making payment");
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert("Payment Successful");
            }
        }
    };

    return (
        <PaymentFormContainer>
            <PaymentForm>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={paymentHandler}>Pay now</Button>
            </PaymentForm>
        </PaymentFormContainer>
    )
}


export default Payment;