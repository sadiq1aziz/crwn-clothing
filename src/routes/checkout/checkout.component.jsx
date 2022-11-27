import { useContext } from "react"
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import './checkout.styles.scss';
import { CartContext } from "../../contexts/cart.context";

const CheckOut = () => {
    const { cartItems, cartItemTotal } = useContext(CartContext);
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
            <div className="total">Total : ${cartItemTotal}</div>
        </div>
    )
}


export default CheckOut