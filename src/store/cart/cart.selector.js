import { createSelector } from "reselect";

export const selectCartReducer = (state) => {
    return state.cart;
} 
//get cartItems from cart reducer
export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => {
        return cart.cartItems;
    }
);
// get cart Toggle value from reducer
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => {
        return cart.isCartOpen;
    }
);
//Calculate total value from the cartItems ; i.e
// use selectCartItems component to retrieve the cartItems 
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        const total = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0);
        return total;
    }
);
//Calculate Count from the cartItems ; i.e
// use selectCartItems component to retrieve the cartItems 
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        const result = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
        return result;
    }
);