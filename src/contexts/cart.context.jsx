import { useEffect, } from 'react';
import { useState, createContext } from 'react';

const decrementOrRemoveTtem = (cartItems, productToRemove) => {
    //check if item count is greater than 1
    const isItemExisting = cartItems.find(cartItem => cartItem.id === productToRemove.id && cartItem.quantity > 1);

    if (isItemExisting) {
        return cartItems.map(cartItem => cartItem.id === productToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
    } else {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }
}

const removeItem = (cartItems, itemToRemove) => {
    const cartItemMatch = cartItems.find(item => item.id === itemToRemove.id);
    if (cartItemMatch) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    }
}

const addCartTtem = (cartItems, productToAdd) => {
    //check if cart item doesnt exist in list of cart items
    // if so -> add to cart item list
    // return new cart item list
    // else if exists, increment quantity attrib of that item in cart item list by 1 
    //return new cart item list

    const cartItemMatch = cartItems.find((item) => { return item.id === productToAdd.id });

    if (cartItemMatch) {
        return cartItems.map(cartItem => (
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ))
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    decrementOrRemoveCartTtem: () => { },
    cartItemCount: 0,
    removeCartItem: () => { },
    cartItemTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItemTotal, setCartItemTotal] = useState(0);

    useEffect(() => {
        const result = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
        const total = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity*cartItem.price), 0)
        setCartItemCount(result);
        setCartItemTotal(total);
    },
        [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartTtem(cartItems, productToAdd));
    };

    const decrementOrRemoveCartTtem = (productToRemove) => {
        setCartItems(decrementOrRemoveTtem(cartItems, productToRemove));
    };
    const removeCartItem = (itemToRemove) => {
        setCartItems(removeItem(cartItems, itemToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount, 
        decrementOrRemoveCartTtem, removeCartItem, cartItemTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

