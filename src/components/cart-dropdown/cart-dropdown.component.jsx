import {useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
const CartDropDown = ({ cartItems }) => {

   const navigate = useNavigate();
    const navToCheckout = () => {
        navigate('/checkout');
    }
    
    return (
        <div className="cart-dropdown-container">
            <div className='cart-items'>
                {cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </div>
            <Button onClick={navToCheckout}>CHECKOUT</Button>
        </div>
    )
}
export default CartDropDown;