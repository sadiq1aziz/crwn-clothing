import { useState } from "react"
import { useDispatch } from "react-redux";
import { userSignedUpStart } from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import './sign-up-form.styles.scss';

const DefaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(DefaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(DefaultFormFields);
    }

    const handleSubmit = async (event) => {
        console.log("submit");
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            console.log("submitted");
            dispatch(userSignedUpStart(email, password, displayName));
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
            <form>
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
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='submit' onClick={handleSubmit}>SignUp</Button>
            </form>
        </div>
    )
}

export default SignUpForm