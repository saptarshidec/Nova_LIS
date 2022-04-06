import RegisterForm from "../../components/registerform/RegisterForm";
import classes from "./Register.module.css";

const Register = () => {
    return (
        <div className={classes["register-container"]}>
            <div className={classes["register"]}>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
