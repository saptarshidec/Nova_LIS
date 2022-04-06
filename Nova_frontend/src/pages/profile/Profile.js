import classes from "./Profile.module.css";
import { useContext, useEffect } from "react";
import UserContext from "../../store/user-context";
import { useParams } from "react-router-dom";
import BookList from "../../components/booklist/BookList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
const Profile = () => {
    const userCtx = useContext(UserContext);
    const params = useParams();

    // useEffect(() => {
    //     if (params.section === "issued") {
    //         userCtx.inFocus("Issued Books");
    //     } else if (params.section === "returned") {
    //         userCtx.inFocus("Returned Books");
    //     } else if (params.section === "reserved") {
    //         userCtx.inFocus("Reserved Books");
    //     } else {
    //         userCtx.inFocus("Personal Information");
    //     }
    // }, []);

    // const getBooks = async () => {
    //     window.scroll(0, 0);
    //     await fetch("http://localhost:5000/profile/" + params.username, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => userCtx.onEndBookQuery(data))
    //         .catch((error) => console.log(error));
    // };

    useEffect(() => userCtx.onBookQuery(userCtx.user.isAdmin ? "Manage Library" : "Issued Books"), []);

    let profileContent;

    if (userCtx.inFocus === "Issued Books") {
        profileContent = (
            <div className={`${classes["issued"]}`}>
                {userCtx.books.isLoaded ? (
                    userCtx.books.issued.length > 0 ? (
                        <BookList
                            title={
                                userCtx.books.issued.length +
                                " Issued " +
                                (userCtx.books.issued.length === 1 ? "Book" : "Books")
                            }
                            books={userCtx.books.issued}
                            navigation="Locked"
                        />
                    ) : (
                        <h1 className={classes["margin"]}>No issued books.</h1>
                    )
                ) : (
                    <h1 className={classes["margin"]}>Loading..</h1>
                )}
            </div>
        );
    } else if (userCtx.inFocus === "Returned Books") {
        profileContent = (
            <div className={`${classes["returned"]}`}>
                {userCtx.books.isLoaded ? (
                    userCtx.books.returned.length > 0 ? (
                        <BookList
                            title={
                                userCtx.books.returned.length +
                                " Returned " +
                                (userCtx.books.returned.length === 1 ? "Book" : "Books")
                            }
                            books={userCtx.books.returned}
                            navigation="Locked"
                        />
                    ) : (
                        <h1 className={classes["margin"]}>No returned books.</h1>
                    )
                ) : (
                    <h1 className={classes["margin"]}>Loading..</h1>
                )}
            </div>
        );
    } else if (userCtx.inFocus === "Manage Library") {
        console.log("Hi");
        profileContent = (
            <div className={`${classes["reserved"]}`}>
                <div className={classes["reserved-list"]}>
                    <NavLink to="/register" className={classes["link"]} key={0}>
                        Register a Member
                    </NavLink>
                    <NavLink to="/users" className={classes["link"]} key={1}>
                        Delete a Member
                    </NavLink>
                    <NavLink to="/addbook" className={classes["link"]} key={2}>
                        Add a Book
                    </NavLink>
                    <NavLink to="/reminder" className={classes["link"]} key={3}>
                        Send Reminder
                    </NavLink>
                    <NavLink to="/expired" className={classes["link"]} key={4}>
                        Remove Obscure Books
                    </NavLink>
                </div>
            </div>
        );
    } else if (userCtx.inFocus === "Reserved Books") {
        profileContent = (
            <div className={`${classes["reserved"]}`}>
                {userCtx.books.isLoaded ? (
                    userCtx.books.reserved.length > 0 ? (
                        <BookList
                            title={
                                userCtx.books.reserved.length +
                                " Reserved " +
                                (userCtx.books.reserved.length === 1 ? "Book" : "Books")
                            }
                            books={userCtx.books.reserved}
                            navigation="Locked"
                        />
                    ) : (
                        <h1 className={classes["margin"]}>No reserved books.</h1>
                    )
                ) : (
                    <h1 className={classes["margin"]}>Loading..</h1>
                )}
            </div>
        );
    } else {
        profileContent = (
            <div className={`${classes["content"]} ${classes["personal"]}`}>
                <div className={classes["personal-content"]}>
                    <p className={classes["main"]}>{userCtx.user.name}</p>
                    <p className={classes["sub"]}>{userCtx.user.roll}</p>
                    <p className={classes["sub"]}>{userCtx.user.designation}</p>
                    <p className={classes["sub"]}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp;&nbsp;{userCtx.user.phone}</p>
                    <p className={classes["sub"]}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp;&nbsp;{userCtx.user.email}</p>
                    <p className={classes["sub"]}>{userCtx.user.userName}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={classes["profile-container"]}>
            <div className={classes["profile"]}>
                <div className={classes["navigation"]}>
                    <ul>
                        {!userCtx.user.isAdmin && (
                            <>
                                <li
                                    className={`${classes["choice"]} ${
                                        userCtx.inFocus === "Issued Books" ? classes["active"] : ""
                                    }`}
                                    onClick={userCtx.onIssuedFocus}
                                >
                                    Issued Books
                                </li>
                                <li
                                    className={`${classes["choice"]} ${
                                        userCtx.inFocus === "Returned Books" ? classes["active"] : ""
                                    }`}
                                    onClick={userCtx.onReturnedFocus}
                                >
                                    Returned Books
                                </li>
                                <li
                                    className={`${classes["choice"]} ${
                                        userCtx.inFocus === "Reserved Books" ? classes["active"] : ""
                                    }`}
                                    onClick={userCtx.onReservedFocus}
                                >
                                    Reserved Books
                                </li>
                            </>
                        )}
                        {userCtx.user.isAdmin && (
                            <li
                                className={`${classes["choice"]} ${
                                    userCtx.inFocus === "Manage Library" ? classes["active"] : ""
                                }`}
                                onClick={userCtx.onManageFocus}
                            >
                                Manage Library
                            </li>
                        )}
                        <li
                            className={`${classes["choice"]} ${
                                userCtx.inFocus === "Personal Information" ? classes["active"] : ""
                            }`}
                            onClick={userCtx.onPersonalFocus}
                        >
                            Personal Info
                        </li>
                    </ul>
                </div>
                {profileContent}
            </div>
        </div>
    );
};

export default Profile;
