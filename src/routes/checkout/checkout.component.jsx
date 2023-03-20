import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import './checkout.styles.scss';
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import Payment from "../../components/payment-form/payment-form.component";

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const cartItemTotal = useSelector(selectCartTotal);
    const emptyMsg = "There are no items added";
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.length > 0 ? cartItems.map(cartItem => (
                <CheckOutItem key={cartItem.id} cartItem={cartItem} />
            )) : emptyMsg}
            <div className="total">Total : INR {cartItemTotal}</div>
            <Payment/>
        </div>
    )
}


export default CheckOut