import {useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import CartItem from '../cart-item/cart-item.component';
const CartDropDown = ({ cartItems }) => {

   const navigate = useNavigate();
    const navToCheckout = () => {
        navigate('/checkout');
    }
    
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length > 0 ? cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                )): 
                <EmptyMessage>Your Cart is Empty</EmptyMessage>}
            </CartItems>
            <Button onClick={navToCheckout}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}
export default CartDropDown;