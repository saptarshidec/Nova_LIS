import { useHistory } from "react-router-dom";
import classes from "./UserCard.module.css";

const UserCard = (props) => {
    const history = useHistory();

    const deleteUserResponseHandler = (data) => {
        console.log("USER DELETED", data);
        window.location.reload();
    };

    const delteUserHandler = async () => {
        return await fetch("http://localhost:5000/deleteUser/" + props.userName, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => deleteUserResponseHandler(data))
            .catch((error) => console.log(error));
    };

    return (
        <div className={classes["user"]}>
            <h1 className={classes["name"]}>{props.name}</h1>
            <h1 className={classes["sub"]}>{props.userName}</h1>
            <h1 className={classes["sub"]}>{props.designation}</h1>
            <div className={classes["btn__container"]}>
                <button className={classes["btn"]} onClick={delteUserHandler}>
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default UserCard;
