import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.USER_SIGNED_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.USER_SIGNED_IN_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.USER_SIGNED_UP_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.USER_SIGNED_UP_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.USER_SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPES.USER_SIGN_OUT_FAILED:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
};