import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (toggle) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, toggle)
}


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartTtem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decrementOrRemoveCartTtem = (cartItems, productToRemove) => {
    const newCartItems = decrementOrRemoveTtem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeCartItem = (cartItems, itemToRemove) => {
    const newCartItems = removeItem(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


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