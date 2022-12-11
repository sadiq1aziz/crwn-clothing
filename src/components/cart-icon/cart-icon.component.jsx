import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);

    const toggleCart = () => {
        if (!isCartOpen) {
            setIsCartOpen(true);
        } else {
            setIsCartOpen(false);
        }
    }

    return (
    <CartIconContainer onClick={toggleCart}> 
        <ShoppingIcon/>
        <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
    )
}
export default CartIcon;