import { useEffect, useState, useContext } from "react";
import UserList from "../../components/userlist/UserList";
import UserContext from "../../store/user-context";
import classes from "./Users.module.css";

const Users = () => {

    const [usersData, setUsersData] = useState({ isLoaded: false, users: []});

    const userCtx = useContext(UserContext);

    const getUsersResponseHandler = (data) => {
        const thisUsers = [];
        for (let user of data.users) {
            if (user.username === "admin") continue;
            thisUsers.push({
                name: user.name,
                userName: user.username,
                designation: user.designation
            })
        }
        console.log(thisUsers);
        setUsersData({isLoaded: true, users: thisUsers});
    };

    const getUsersHandler = async () => {
        await fetch("http://localhost:5000/getUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => getUsersResponseHandler(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => getUsersHandler(), []);

    return (
        <div className={classes["users"]}>
            {usersData.isLoaded ? <UserList users={usersData.users} /> : <h1>Loading...</h1>}
        </div>
    );
};

export default Users;