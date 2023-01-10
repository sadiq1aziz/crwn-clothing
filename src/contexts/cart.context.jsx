import { useEffect, } from 'react';
import { useState, useReducer, createContext } from 'react';

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

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error('Unexpected cart action');
    }

}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0,
    cartItemTotal: 0
}

export const CartProvider = ({ children }) => {

    const [{ isCartOpen, cartItems, cartItemCount, cartItemTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    //function to handle updated cartitems. This is obtained via custom methods we provided through context
    //where they are pulled in the respective component and triggered w.r.t. user action

    const updatedCartReducer = (newCartItems) => {
        // agenda here is to recalculate based on newcartitems
        //  1.total, 2. count, 3. Trigger dispatch to update the STATE object of the application with the newly modified
        // cartitemsObject

        //1. recalulcate total
        const total = newCartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0);
        //2. recalculate count
        const result = newCartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
        //3. trigger dispatch to update STATE object
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: { cartItemCount: result, cartItemTotal: total, cartItems: newCartItems }
        });
    }
    // after user has toggled cart value by clicking cart Icon, we store that value in State
    // We call dispatch with the new toggle value

    const updateCartToggle = (value) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: value });
    }

    const setIsCartOpen = (value) => {
        updateCartToggle(value);
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartTtem(cartItems, productToAdd);
        updatedCartReducer(newCartItems);
    };

    const decrementOrRemoveCartTtem = (productToRemove) => {
        const newCartItems = decrementOrRemoveTtem(cartItems, productToRemove);
        updatedCartReducer(newCartItems);
    };
    const removeCartItem = (itemToRemove) => {
        const newCartItems = removeItem(cartItems, itemToRemove);
        updatedCartReducer(newCartItems);
    }

    const value = {
        isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount,
        decrementOrRemoveCartTtem, removeCartItem, cartItemTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

