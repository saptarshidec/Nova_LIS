import LoginForm from "../../components/loginform/LoginForm";
import classes from "./Login.module.css";

const Login = () => {
    return (
        <div className={classes["login-container"]}>
            <div className={classes["login"]}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
