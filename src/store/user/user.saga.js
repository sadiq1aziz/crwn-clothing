    import { takeLatest, all, call, put } from 'redux-saga/effects';
    import { createUserDocumentFromAuth, getCurrentUser, userSignOut } from '../../utils/firebase/firebase.utils';
    import { checkUserSession, userSignedInFailed, userSignedInSuccess, userSignedUpFailed, userSignedUpSuccess, userSignoutFailed, userSignoutSuccess } from './user.action';
    import { USER_ACTION_TYPES } from './user.types';
    import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
    import { signInUserWithEmailPassword } from '../../utils/firebase/firebase.utils';
    import { createAuthUserViaEmailPassword } from '../../utils/firebase/firebase.utils';

    export function* isUserAuthenticated () {
        try {
            const userAuth = yield call(getCurrentUser);
            if (!userAuth) {
                return 
            }
            // if userAuth available then call saga to get snapshot of user
            yield call(getUserSnapshot, userAuth); 
        } catch (error) {
            yield put(userSignedInFailed(error));
        }
    }

    export function* googleSignIn(){
        try {
            const {user} = yield call(signInWithGooglePopup);
            if (!user){
                return; 
            }
            yield call(getUserSnapshot, user);
        } catch (error) {
            yield put(userSignedInFailed(error));
        }
        
    }

    export function* emailSignIn(action){
        const { payload } = action;
        const { email, password } = payload;
        try {
            const { user } = yield call(signInUserWithEmailPassword, email, password);
            if (!user){
                return;
            } 
            yield call(getUserSnapshot, user);
        } catch (error) {
            yield put(userSignedInFailed(error));
        }
        
    }

    export function* checkCurrentUserSession () {
        yield takeLatest( USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
    }

    export function* googleSigninStartup (){
        yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
    }

    export function* emailSigninStartup (){
        yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
    }

    export function* userSignUpStart (){
        yield takeLatest(USER_ACTION_TYPES.USER_SIGN_UP_START, userSignUp)
    };

    export function* userSignInPostSignedUp(){
        yield takeLatest(USER_ACTION_TYPES.USER_SIGNED_UP_SUCCESS, userSignInPostSignedUpHandler);
    }

    
    export function* userSignOutStarted(){
        yield takeLatest(USER_ACTION_TYPES.USER_SIGN_OUT_START, signOut);
    }

    export function* signOut(){
        try {
            yield call(userSignOut);
            yield put(userSignoutSuccess());
        } catch (error){
            yield put(userSignoutFailed(error));
        }
    }

    export function* userSignInPostSignedUpHandler(action){
        const { payload } = action;
        const { user, otherAttributes} = payload;    
        yield call(getUserSnapshot, user, otherAttributes);
    }


    export function* userSignUp(action) {
        const { payload } = action;
        const { email, password, displayName } = payload;    
        try {
            const response = yield call(createAuthUserViaEmailPassword, email, password);
            const { user } = response;
            if (!user){
                return;
            }
            yield put(userSignedUpSuccess(user, {displayName}));

        } catch (error){
            yield put(userSignedUpFailed(error));
        }
    }

    export function* getUserSnapshot(userAuth, otherAttributes){
        try {
            // if userAuth exists we make the call to firestore to get userSnapshot from the userAuth object
            // if it isnt there then it creates a userSnapshot and is returned to us.
            const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, otherAttributes);
            // use put to trigger actions instead of dispatch in function generators
            yield put(userSignedInSuccess({ id: userSnapshot.id, ...userSnapshot.data()})); 
        } catch ( error) {
            yield put(userSignedInFailed(error));
        }
    }   


    export function* userSagas () {
        yield all([call(checkCurrentUserSession), call(googleSigninStartup), call(emailSigninStartup), 
            call(userSignUpStart), call(userSignInPostSignedUp), call(userSignOutStarted)]);
    }