import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decrementOrRemoveCartTtem, removeCartItem } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';


const CheckOutItem = ({cartItem}) => {
   const dispatch = useDispatch();
   const { imageUrl, name, price, quantity} =  cartItem;
   const cartItems = useSelector(selectCartItems);
   const incrementCartItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
   }

   const decrementCartItemHandler = () => {
    dispatch(decrementOrRemoveCartTtem(cartItems, cartItem));
   }

   const removeHandler= () => {
    dispatch(removeCartItem(cartItems, cartItem));
   }

   return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <div className="name">{name}</div>
            <div className="quantity">
                <div className="arrow" onClick={decrementCartItemHandler}>&#10094;</div>
                <div className="value">{quantity}</div>
                <div className="arrow" onClick={incrementCartItemHandler}>&#10095;</div>
            </div>
            <div className="price">{price}</div>
            <div className="remove-button" onClick={removeHandler}>&#10005;</div>
        </div>
    )
}


export default CheckOutItem;