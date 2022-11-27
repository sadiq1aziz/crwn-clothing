import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { userSignOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation.styles.scss';
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen, cartItems } = useContext(CartContext);
    console.log(currentUser);

    return (
        <Fragment>
            <div className="navigation">
                <div className='logo-container'>
                    <Link className="logo" to='/' >
                        <CrwnLogo />
                    </Link>
                </div>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {currentUser ? (<Link className="nav-link" onClick={userSignOut}>
                        SignOut
                    </Link>):(<Link className="nav-link" to='/auth'>
                        SignIn
                    </Link>)
                    }
                    <CartIcon />
                </div>{
                    isCartOpen && <CartDropDown cartItems={cartItems}/>
                }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;