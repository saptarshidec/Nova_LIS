import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import classes from "./LoginForm.module.css";

import UserContext from "../../store/user-context";

const isNotEmpty = (value) => value.trim() !== "";

const Login = () => {

    const history = useHistory();

    const userCtx = useContext(UserContext);

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
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);

    const [usernameExists, setUsernameExists] = useState(true);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);


    let formIsValid = false;
    if (userNameIsValid && !usernameExists && passwordIsValid) formIsValid = true;

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const userNameInputClasses = userNameInputHasError || !usernameExists ? errorClasses : normalClasses;
    const passwordInputClasses = passwordInputHasError || !isPasswordCorrect ? errorClasses : normalClasses;

    const loginHandler = (data) => {
        if (!data.isRegistered) {
            setUsernameExists(false);
        } else {
            if (data.isPasswordCorrect) {
                setIsPasswordCorrect(true);
                const user = {
                    name: data.name,
                    roll: data.roll,
                    designation: data.designation,
                    phone: data.phone,
                    email: data.email,
                    userName: data.userName,
                    isAdmin: data.userName === "admin"
                };
                userCtx.onLogin(user);
            } else {
                setIsPasswordCorrect(false);
            }
        }
    }

    const loginUser = async (body) => {
        window.scroll(0, 0);
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => loginHandler(data))
            .catch((error) => console.log(error));
    };

    const masterUsernameChangeHandler = (event) => {
        userNameChangeHandler(event);
        setIsPasswordCorrect(true);
        setUsernameExists(true);
    }

    const masterPasswordChangeHandler = (event) => {
        passwordChangeHandler(event);
        setIsPasswordCorrect(true);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            userName: userName.trim(),
            password
        };

        loginUser(user);
    };

    return (
        <form className={`${classes["form"]}`} autoComplete="off" onSubmit={submitHandler}>
            <h1 className={classes["form__title"]}>Login</h1>
            <div className={`${classes["form__inputs"]}`}>
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
                    {(userNameInputHasError || !usernameExists) && <p className={classes["input__message"]}>{userNameInputHasError ? "Username must not be empty." : "Username does not exist."}</p>}
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
                        onChange={masterPasswordChangeHandler}
                        onBlur={passwordInputBlurHandler}
                    />
                    {passwordInputHasError || !isPasswordCorrect && <p className={classes["input__message"]}>{passwordInputHasError ? "Password cannot be empty." : "Incorrect password."}</p>}
                </div>
            </div>
            <div className={`${classes["form__btn-group"]}`}>
                <button
                    className={`${classes["form__btn"]}`}
                    // disabled={!formIsValid}
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
