import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './cart-icon.styles.scss';

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
    <div className="cart-icon-container"> 
        <ShoppingIcon className="shopping-container" onClick={toggleCart}/>
        <span className="item-count">{cartItemCount}</span>
    </div>
    )
}
export default CartIcon;