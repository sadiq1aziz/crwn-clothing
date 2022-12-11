import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext } from "react";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const ProductsCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const {addItemToCart } = useContext(CartContext);
    const addToCartHandler = () => {
        addItemToCart(product);
    }
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button className="button" buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCartHandler}>Add to Cart</Button>
        </div>
    )
}

export default ProductsCard