import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { userSignOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLinks} from './navigation.styles.jsx';
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const {isCartOpen, cartItems } = useContext(CartContext);
    console.log(currentUser);

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
                    <NavLinks as='span' onClick={userSignOut}>
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