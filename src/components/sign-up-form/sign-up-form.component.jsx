import { useState } from "react"
import { createAuthUserViaEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import './sign-up-form.styles.scss';

const DefaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {

    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    console.log(formFields);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const response = await createAuthUserViaEmailPassword(email, password);
            console.log(response);
            const { user } = response;
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("email already in use");
            } else {
                console.log("there was an error with signin via email, password", error);
            }

        }

    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='displayName'
                    required
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                />
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
                <FormInput
                    label='Confirm Password'
                    required
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <Button
                    buttonType='inverted'
                    type='submit'
                >
                    SignUp
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm