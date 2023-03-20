import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemCount = useSelector(selectCartCount);
    const toggleCart = () => {
        if (!isCartOpen) {
            dispatch(setIsCartOpen(true))
        } else {
            dispatch(setIsCartOpen(false))
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