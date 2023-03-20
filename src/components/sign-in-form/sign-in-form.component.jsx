
import { useState } from "react"
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import './sign-in-form.styles.scss';

const DefaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { email, password } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }

    const handleButtonSubmit = async() => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User has not been found to exist');
                    break;
                case 'auth/wrong-password':
                    alert('Wrong password has been entered');
                    break;
                default:
                    console.log('There was an unexpected error', error);
            }
        }

    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput
                    label='Email'
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label='Password'
                    required
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='submit' onClick={handleSubmit}>SignIn</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={handleButtonSubmit}>Google SignIn</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;