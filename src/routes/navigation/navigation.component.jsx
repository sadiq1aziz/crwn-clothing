import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLinks} from './navigation.styles.jsx';
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";
import { checkUserSession, userSignoutStart } from "../../store/user/user.action";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, []);
    
    const signOutUser = () => {
        dispatch(userSignoutStart());
    }
    return (
        <Fragment>
            <NavigationContainer className="navigation">
                <LogoContainer  to='/'>
                        <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLinks to='/shop'>
                        Shop
                    </NavLinks>
                    {currentUser ? (
                    <NavLinks as='span' onClick={signOutUser}>
                        SignOut
                    </NavLinks>):(
                    <NavLinks to='/auth'>
                        SignIn
                    </NavLinks>)
                    }
                    <CartIcon />
                </NavLinksContainer>{
                    isCartOpen && <CartDropDown cartItems={cartItems}/>
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;
