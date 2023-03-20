import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const checkUserSession = () => {
     return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
};

export const googleSignInStart = () => {
     return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
};

export const emailSignInStart = (email, password) => {
     return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password} );
};

export const userSignedInSuccess = (user) => {
     return createAction(USER_ACTION_TYPES.USER_SIGNED_IN_SUCCESS, user );
};

export const userSignedInFailed = (error) => {
     return createAction(USER_ACTION_TYPES.USER_SIGNED_IN_FAILED, error );
};

export const userSignedUpStart = (email, password, displayName) => {
     return createAction(USER_ACTION_TYPES.USER_SIGN_UP_START, { email, password, displayName});
};

export const userSignedUpSuccess = (user, otherAttributes) => {
     return createAction(USER_ACTION_TYPES.USER_SIGNED_UP_SUCCESS, {user, otherAttributes} );
};

export const userSignedUpFailed = (error) => {
     return createAction(USER_ACTION_TYPES.USER_SIGNED_UP_FAILED, error);
};

export const userSignoutStart = () => {
     return createAction(USER_ACTION_TYPES.USER_SIGN_OUT_START);
}

export const userSignoutSuccess = () => {
     return createAction(USER_ACTION_TYPES.USER_SIGN_OUT_SUCCESS);
}

export const userSignoutFailed = (error) => {
     return createAction(USER_ACTION_TYPES.USER_SIGN_OUT_FAILED, error);
}
