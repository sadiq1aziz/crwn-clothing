import { CartItemContainer, ItemDetails, Name} from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name as='span'>{name}</Name>
                <Name as='span'>{quantity} x ${price}</Name>
            </ItemDetails>
        </CartItemContainer>
    )

}

export default CartItem;