import UserCard from "../usercard/UserCard";
import classes from "./UserList.module.css";

const UserList = (props) => {
    return (
        <div className={classes["users"]}>
            <ul className={classes["userlist"]}>
                {props.users.map((user, index) => {
                    return (
                        <li key={index}>
                            <UserCard name={user.name} userName={user.userName} designation={user.designation}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default UserList;