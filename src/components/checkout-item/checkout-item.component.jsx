import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';


const CheckOutItem = ({cartItem}) => {
   const { imageUrl, name, price, quantity} =  cartItem;
   const { addItemToCart, decrementOrRemoveCartTtem, removeCartItem } = useContext(CartContext);
   
   const incrementCartItemHandler = () => {
    addItemToCart(cartItem);
   }

   const decrementCartItemHandler = () => {
    decrementOrRemoveCartTtem(cartItem);
   }

   const removeHandler= () => {
    removeCartItem(cartItem);
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