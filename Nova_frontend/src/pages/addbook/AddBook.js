import BookForm from "../../components/bookform/BookForm";
import classes from "./AddBook.module.css";

import { useContext } from "react";
import UserContext from "../../store/user-context";

const AddBook = () => {

    const userCtx = useContext(UserContext);

    let content = <BookForm />;
    if (!userCtx.isLoggedIn || (userCtx.isLoggedIn && !userCtx.user.isAdmin)) content = <h1>Invalid access.</h1>;

    return (
        <div className={classes["addbook-container"]}>
            <div className={classes["addbook"]}>
                {content}
            </div>
        </div>
    );
};

export default AddBook;
