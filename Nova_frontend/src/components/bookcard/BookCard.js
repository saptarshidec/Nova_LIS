import Popup from "../popup/Popup";
import UserContext from "../../store/user-context";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import classes from "./BookCard.module.css";

const Book = (props) => {
    const userCtx = useContext(UserContext);
    const history = useHistory();

    const detailsNavHandler = () => {
        window.open(`http://localhost:3000/book/${props.number}`, "_blank");
    };

    const confirmIssueHandler = () => {
        if (props.type === "Returned" && props.isDeleted) {
            setPopUpStatus({
                isOpen: true,
                title: "Issue Response",
                message: "This book is no longer available in the library.",
                hasSingleBtn: true,
                right: "Ok",
                onClickRight: () => closeHandler,
            });
        }
        else {
            setPopUpStatus({
                isOpen: true,
                title: userCtx.isLoggedIn ? "Confirm Book Issue" : "Login to Issue Book",
                message: userCtx.isLoggedIn
                    ? "Are you sure you want to issue this book?"
                    : "You are not logged in to Nova LIS. Do you want to login?",
                hasSingleBtn: false,
                left: "Yes",
                right: "No",
                onClickLeft: userCtx.isLoggedIn ? issueHandler : loginRedirectHandler,
                onClickRight: closeHandler,
            });
        }
    };

    const issueHandler = async () => {
        closeHandler();
        const body = {
            bookid: props.id,
            username: userCtx.user.userName,
        };
        await fetch("http://localhost:5000/issue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                issueResponseHandler(data);
            })
            .catch((error) => console.log(error));
    };

    const issueResponseHandler = (data) => {
        if (data.isIssued) {
            setPopUpStatus((prevStatus) => {
                return {
                    ...prevStatus,
                    isOpen: true,
                    title: "Issue Response",
                    message: "Successfully issued book from Nova LIS.",
                    hasSingleBtn: true,
                    right: "Ok",
                    onClickRight: () => profileRedirectHandler("Issued Books"),
                };
            });
            return;
        }
        if (data.issuelimit) {
            setPopUpStatus((prevStatus) => {
                return {
                    ...prevStatus,
                    isOpen: true,
                    title: "Issue Response",
                    message: "You have exceeded the maximum amount of books you can issue from Nova LIS.",
                    hasSingleBtn: true,
                    right: "Ok",
                };
            });
            return;
        }
        if (data.alreadyissued) {
            setPopUpStatus((prevStatus) => {
                return {
                    ...prevStatus,
                    isOpen: true,
                    title: "Issue Response",
                    message: "You have already issued a copy of this book.",
                    hasSingleBtn: true,
                    right: "Ok",
                };
            });
            return;
        }
        if (data.canReserve) {
            setPopUpStatus({
                isOpen: true,
                title: "Issue Response",
                message: "No copies available right now. Do you want to reserve the book?",
                hasSingleBtn: false,
                left: "Yes",
                right: "No",
                onClickLeft: reserveHandler,
                onClickRight: closeHandler,
            });
        } else {
            setPopUpStatus({
                isOpen: true,
                title: "Issue Response",
                message:
                    "This book currently does not have any copies in the library. You have already reserved this book.",
                hasSingleBtn: true,
                right: "Ok",
                onClickRight: closeHandler,
            });
        }
    };

    const confirmReturnHandler = () => {
        setPopUpStatus({
            isOpen: true,
            title: "Confirm Book Return",
            message: "Are you sure you want to return this book?",
            hasSingleBtn: false,
            left: "Yes",
            right: "No",
            onClickLeft: returnHandler,
            onClickRight: closeHandler,
        });
    };

    const returnHandler = async () => {
        closeHandler();
        await fetch("http://localhost:5000/return/" + props.tId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => returnResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const returnResponseHandler = (data) => {
        if (data.isOverdue) {
            setPopUpStatus({
                isOpen: true,
                title: "Return Response",
                message: "Successfully returned book. Pay a penalty of ₹ " + data.penalty + ".",
                hasSingleBtn: true,
                right: "Pay",
                onClickRight: () => profileRedirectHandler("Returned Books"),
            });
        } else {
            setPopUpStatus({
                isOpen: true,
                title: "Return Response",
                message: "Successfully returned book. No penalty incurred.",
                hasSingleBtn: true,
                right: "Ok",
                onClickRight: () => profileRedirectHandler("Returned Books"),
            });
        }
    };

    const confirmDeleteHandler = () => {
        setPopUpStatus((prevStatus) => {
            return {
                isOpen: true,
                title: "Confirm Book Deletion",
                message: "Are you sure you want to remove this book from the library?",
                hasSingleBtn: false,
                left: "Yes",
                right: "No",
                onClickLeft: deleteHandler,
                onClickRight: closeHandler,
            };
        });
    };

    const deleteHandler = async () => {
        closeHandler();
        await fetch("http://localhost:5000/deleteBook/" + props.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => deleteResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const deleteResponseHandler = () => {
        setPopUpStatus({
            isOpen: true,
            title: "Delete Response",
            message: "Successfully deleted the book.",
            hasSingleBtn: true,
            right: "Ok",
            onClickRight: () => {
                closeHandler();
                window.location.reload();
            },
        });
    };

    const confirmReminderHandler = () => {
        setPopUpStatus((prevStatus) => {
            return {
                isOpen: true,
                title: "Confirm Reminder",
                message: "Are you sure you want to send a reminder message for this book to be returned?",
                hasSingleBtn: false,
                left: "Yes",
                right: "No",
                onClickLeft: reminderHandler,
                onClickRight: closeHandler,
            };
        });
    };

    const reminderHandler = async () => {
        closeHandler();
        await fetch("http://localhost:5000/printReminder/" + props.tId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => reminderResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const reminderResponseHandler = (data) => {
        if (data.alreadySent) {
            setPopUpStatus({
                isOpen: true,
                title: "Reminder Response",
                message: "Already printed the reminder message for this book.",
                hasSingleBtn: true,
                right: "Ok",
                onClickRight: closeHandler,
            });
        } else {
            setPopUpStatus({
                isOpen: true,
                title: "Reminder Response",
                message: "Successfully sent reminder.",
                hasSingleBtn: true,
                right: "Ok",
                onClickRight: closeHandler,
            });
        }
    };

    const reserveHandler = async () => {
        closeHandler();
        const reserveData = {
            bookid: props.id,
            username: userCtx.user.userName,
        };
        await fetch("http://localhost:5000/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reserveData),
        })
            .then((response) => response.json())
            .then((data) => reserveResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const reserveResponseHandler = () => {
        setPopUpStatus({
            isOpen: true,
            title: "Confirm Reminder",
            message: "Book has been reserved successfully.",
            hasSingleBtn: false,
            right: "Ok",
            onClickRight: closeHandler,
        });
    };

    const closeHandler = () => {
        setPopUpStatus((prevStatus) => {
            return { ...prevStatus, isOpen: false };
        });
    };

    const loginRedirectHandler = () => {
        closeHandler();
        history.push("/login");
    };

    const profileRedirectHandler = (section) => {
        closeHandler();
        userCtx.onBookQuery(section);
    };

    const [popUpStatus, setPopUpStatus] = useState({
        isOpen: false,
        title: userCtx.isLoggedIn ? "Confirm Book Issue" : "Login to Issue Book",
        message: userCtx.isLoggedIn
            ? "Are you sure you want to issue this book?"
            : "You are not logged in to Nova LIS. Do you want to login?",
        hasSingleBtn: false,
        left: "Yes",
        right: "No",
        onClickLeft: userCtx.isLoggedIn ? issueHandler : loginRedirectHandler,
        onClickRight: closeHandler,
    });

    let metaData = <></>;
    if (props.type === "Issued") {
        metaData = (
            <>
                <h3 className={classes["author"]}>Issued On: &nbsp;{props.issuedOn}</h3>
                <h3 className={classes["author"]}>Deadline: &nbsp;{props.expectedReturn}</h3>
                {props.isPrinted ? (
                    <h3 className={classes["author"]}>Deadline crossed. Please return the book.</h3>
                ) : (
                    <h3 className={classes["author"]}></h3>
                )}
            </>
        );
    }
    if (props.type === "Returned") {
        metaData = (
            <>
                <h3 className={classes["author"]}>Issued On: &nbsp;{props.issuedOn}</h3>
                <h3 className={classes["author"]}>Returned On: &nbsp;{props.returnedOn}</h3>
            </>
        );
    }
    if (props.type === "Reminder") {
        metaData = (
            <>
                <h3 className={classes["author"]}>Issued On: &nbsp;{props.issuedOn}</h3>
                <h3 className={classes["author"]}>Deadline: &nbsp;{props.expectedReturn}</h3>
                <h3 className={classes["author"]}>Username: {props.userName}</h3>
                {props.isOverdue ? <h3 className={classes["author"]}>Overdue</h3> : <h3 className={classes["author"]}>Not Overdue</h3>}
            </>
        );
    }

    let transaction = <></>;
    if (props.type === "Issued") {
        transaction = (
            <button className={classes["shadow-btn"]} onClick={confirmReturnHandler}>
                Return
            </button>
        );
    } else if (props.type === "Display" || props.type === "Returned") {
        transaction = (
            <button className={classes["shadow-btn"]} onClick={confirmIssueHandler}>
                {props.type === "Display" ? "Issue" : "Issue Again"}
            </button>
        );
    } else if (props.type === "Reminder") {
        transaction = props.isOverdue ? (
            <button className={classes["shadow-btn"]} onClick={confirmReminderHandler}>
                Send Reminder
            </button>
        ) : (
            <></>
        );
    } else if (props.type === "Reserved") {
        transaction = (
            props.isAvailable ?
            (<button className={classes["shadow-btn"]} onClick={confirmIssueHandler}>
                Claim
            </button>) : <></>
        );
    } else {
        transaction = (
            <button className={classes["shadow-btn"]} onClick={confirmDeleteHandler}>
                Remove Book
            </button>
        );
    }

    // const shouldPrintTransaction = ((!userCtx.user.isAdmin || (userCtx.user.isAdmin && props.type === "Reminder"));
    const shouldPrintTransaction =
        !userCtx.isLoggedIn ||
        (userCtx.isLoggedIn && !userCtx.user.isAdmin) ||
        (userCtx.isLoggedIn && userCtx.user.isAdmin && (props.type === "Reminder" || props.type === "Expired")) ||
        (props.type === "Reserved" && props.isAvailable);

    return (
        <>
            {ReactDOM.createPortal(
                <Popup
                    isOpen={popUpStatus.isOpen}
                    title={popUpStatus.title}
                    message={popUpStatus.message}
                    hasSingleBtn={popUpStatus.hasSingleBtn}
                    left={popUpStatus.left}
                    right={popUpStatus.right}
                    onClickLeft={popUpStatus.onClickLeft}
                    onClickRight={popUpStatus.onClickRight}
                />,
                document.getElementById("overlay-root")
            )}

            <div className={classes["book"]}>
                <div className={classes["cover__container"]}>
                    <img src={props.cover} alt={props.bookName} className={classes["cover"]} />
                    <div className={classes["shadow"]}>
                        <div className={classes["shadow-btn__group"]}>
                            {shouldPrintTransaction && transaction}
                            <button className={classes["shadow-btn"]} onClick={detailsNavHandler}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className={classes["book__title"]}>
                    <h2 className={classes["name"]}>{props.bookName}</h2>
                    <h3 className={classes["author"]}>{props.author}</h3>
                    {metaData}
                </div>
            </div>
        </>
    );
};

export default Book;
