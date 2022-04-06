import { useParams } from "react-router-dom";
import classes from "./RegisterSuccess.module.css";

const RegisterSuccess = () => {

    const params = useParams();

    return (
        <div className={classes["register-success"]}>
            <h1 className={classes["text"]}>{params.message}</h1>
        </div>
    );
}

export default RegisterSuccess;