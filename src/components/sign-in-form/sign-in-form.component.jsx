
import { useState } from "react"
import {signInUserWithEmailPassword, signInWithGooglePopup} from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import './sign-in-form.styles.scss';

const DefaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { email, password } = formFields;
    console.log(formFields);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }

    const handleButtonSubmit = async() => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInUserWithEmailPassword(email, password);
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
            <form onSubmit={handleSubmit}>
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
                    <Button buttonType='inverted' type='submit'>SignIn</Button>
                    <Button buttonType='google' type='button' onClick={handleButtonSubmit}>Google SignIn</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;