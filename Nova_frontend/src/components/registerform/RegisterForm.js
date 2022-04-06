import classes from "./RegisterForm.module.css";
import useInput from "../../hooks/use-input";

import { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import UserContext from "../../store/user-context";

const isNotEmpty = (value) => value.trim() !== "";

const isEmail = (value) => value.includes("@");

const RegisterForm = () => {

    const history = useHistory();
    const userCtx = useContext(UserContext);

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetName,
    } = useInput(isNotEmpty);

    const {
        value: roll,
        isValid: rollIsValid,
        hasError: rollInputHasError,
        valueChangeHandler: rollChangeHandler,
        inputBlurHandler: rollInputBlurHandler,
        reset: resetRoll,
    } = useInput(isNotEmpty);

    const {
        value: designation,
        isValid: designationIsValid,
        hasError: designationInputHasError,
        valueChangeHandler: designationChangeHandler,
        inputBlurHandler: designationInputBlurHandler,
        reset: resetDesignation,
    } = useInput(isNotEmpty);

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);

    const {
        value: phone,
        isValid: phoneIsValid,
        hasError: phoneInputHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneInputBlurHandler,
        reset: resetPhone,
    } = useInput(isNotEmpty);

    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameInputBlurHandler,
        reset: resetUserName,
    } = useInput(isNotEmpty);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: primaryPasswordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);

    const isConfirmPasswordValid = (value) => {
        return value === password;
    };

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordInputBlurHandler,
        reset: resetConfirmPassword,
    } = useInput(isConfirmPasswordValid);

    const passwordChangeHandler = (event) => {
        primaryPasswordChangeHandler(event);
        resetConfirmPassword();
    };

    // const designationChangeHandler = (event) => {
    //     setDesignation(event.target.value);
    // };

    const [rollExists, setRollExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);

    let formIsValid = false;
    if (
        nameIsValid &&
        rollIsValid &&
        !rollExists &&
        designationIsValid &&
        emailIsValid &&
        !emailExists &&
        phoneIsValid &&
        !phoneExists &&
        userNameIsValid &&
        !usernameExists &&
        passwordIsValid
    )
        formIsValid = true;

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const nameInputClasses = nameInputHasError ? errorClasses : normalClasses;
    const rollInputClasses = rollInputHasError || rollExists ? errorClasses : normalClasses;
    const designationInputClasses = designationInputHasError ? errorClasses : normalClasses;
    const emailInputClasses = emailInputHasError || emailExists ? errorClasses : normalClasses;
    const phoneInputClasses = phoneInputHasError || phoneExists ? errorClasses : normalClasses;
    const userNameInputClasses = userNameInputHasError || usernameExists ? errorClasses : normalClasses;
    const passwordInputClasses = passwordInputHasError ? errorClasses : normalClasses;
    const confirmPasswordInputClasses = confirmPasswordInputHasError ? errorClasses : normalClasses;

    const [isRegistering, setIsRegistering] = useState(false);

    const registerHandler = (data) => {
        setIsRegistering(false);
        if (data.accepted) {
            history.push("/registersuccess/" + "Successfully registered to the library.");
        } else {
            setRollExists(data.rollExists);
            setEmailExists(data.emailExists);
            setPhoneExists(data.phoneExists);
            setUsernameExists(data.usernameExists);
        }
    };

    const insertUser = async (body) => {
        setIsRegistering(true);
        window.scroll(0, 0);
        return await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {registerHandler(data); return data;})
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const user = {
            name: name.trim(),
            roll: roll.trim(),
            designation,
            email: email.trim(),
            phone: phone.trim(),
            userName: userName.trim(),
            password,
        };

        insertUser(user).then((data) => {
            resetName();
            if (!data.rollExists) resetRoll();
            if (!data.emailExists) resetEmail();
            if (!data.phoneExists) resetPhone();
            if (!data.usernameExists) resetUserName();
            resetPassword();
            resetConfirmPassword();
        });
    };

    const masterPhoneChangeHandler = (event) => {
        phoneChangeHandler(event);
        setPhoneExists(false);
    };

    const masterEmailChangeHandler = (event) => {
        emailChangeHandler(event);
        setEmailExists(false);
    };

    const masterUsernameChangeHandler = (event) => {
        userNameChangeHandler(event);
        setUsernameExists(false);
    };

    const masterRollChangeHandler = (event) => {
        rollChangeHandler(event);
        setRollExists(false);
    };

    const Loader = <h1 className={classes["registering"]}>Registering...</h1>;
    // console.log(userCtx);

    if (!isRegistering) {
        return (
            <form className={`${classes["form"]}`} autoComplete="off" onSubmit={submitHandler}>
                <h1 className={classes["form__title"]}>{(userCtx.isLoaded && userCtx.user.isAdmin) ? "Register a Member" : "Register"}</h1>
                <div className={`${classes["form__inputs"]}`}>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="name">
                            Name
                        </label>
                        <input
                            className={nameInputClasses}
                            id="name"
                            type="text"
                            value={name}
                            name="name"
                            onChange={nameChangeHandler}
                            onBlur={nameInputBlurHandler}
                        />
                        {nameInputHasError && <p className={classes["input__message"]}>Name must not be empty.</p>}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="roll">
                            Roll Number
                        </label>
                        <input
                            className={rollInputClasses}
                            id="roll"
                            type="text"
                            value={roll}
                            name="roll"
                            onChange={masterRollChangeHandler}
                            onBlur={rollInputBlurHandler}
                        />
                        {(rollInputHasError || rollExists) && (
                            <p className={classes["input__message"]}>
                                {rollInputHasError
                                    ? "Please enter a valid roll number."
                                    : "Roll number already exists."}
                            </p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="roll">
                            Choose Designation
                        </label>
                        <select
                            className={designationInputClasses}
                            value={designation}
                            onChange={designationChangeHandler}
                            onBlur={designationInputBlurHandler}
                        >
                            <option value="" disabled>
                                Select your designation
                            </option>
                            <option value="UG Student" className={classes["option"]}>
                                UG Student
                            </option>
                            <option value="PG Student" className={classes["option"]}>
                                PG Student
                            </option>
                            <option value="Research Scholar" className={classes["option"]}>
                                Research Scholar
                            </option>
                            <option value="Faculty" className={classes["option"]}>
                                Faculty
                            </option>
                        </select>
                        {designationInputHasError && (
                            <p className={classes["input__message"]}>Please choose a designation.</p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={emailInputClasses}
                            id="email"
                            type="text"
                            value={email}
                            name="email"
                            onChange={masterEmailChangeHandler}
                            onBlur={emailInputBlurHandler}
                        />
                        {(emailInputHasError || emailExists) && (
                            <p className={classes["input__message"]}>
                                {emailInputHasError ? "Please enter a valid email." : "Email already exists."}
                            </p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className={phoneInputClasses}
                            id="phone"
                            type="text"
                            value={phone}
                            name="phone"
                            onChange={masterPhoneChangeHandler}
                            onBlur={phoneInputBlurHandler}
                        />
                        {(phoneInputHasError || phoneExists) && (
                            <p className={classes["input__message"]}>
                                {phoneInputHasError ? "Please enter a valid phone number." : "Phone already exists."}
                            </p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="userName">
                            Username
                        </label>
                        <input
                            className={userNameInputClasses}
                            id="userName"
                            type="text"
                            value={userName}
                            name="username"
                            onChange={masterUsernameChangeHandler}
                            onBlur={userNameInputBlurHandler}
                        />
                        {(userNameInputHasError || usernameExists) && (
                            <p className={classes["input__message"]}>
                                {userNameInputHasError ? "Username must not be empty." : "Username already exists."}
                            </p>
                        )}
                    </div>
                    <div className={`${classes["input"]}`}>
                        <label className={`${classes["input__label"]}`} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={passwordInputClasses}
                            id="password"
                            type="password"
                            value={password}
                            name="password"
                            onChange={passwordChangeHandler}
                            onBlur={passwordInputBlurHandler}
                        />
                        {passwordInputHasError && (
                            <p className={classes["input__message"]}>Password cannot be empty.</p>
                        )}
                    </div>
                    <div className={`${classes["input"]}`}>
                        <label className={`${classes["input__label"]}`} htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className={confirmPasswordInputClasses}
                            id="cofirm-password"
                            type="password"
                            value={confirmPassword}
                            name="confirm-password"
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordInputBlurHandler}
                        />
                        {confirmPasswordInputHasError && (
                            <p className={classes["input__message"]}>Passwords do not match.</p>
                        )}
                    </div>
                </div>
                <div className={`${classes["form__btn-group"]}`}>
                    <button
                        className={`${classes["form__btn"]}`}
                        // disabled={!formIsValid}
                    >
                        Register
                    </button>
                </div>
            </form>
        );
    } else {
        return Loader;
    }
};

export default RegisterForm;
