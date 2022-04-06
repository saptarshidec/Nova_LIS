import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const UserContext = React.createContext({
    isLoggedIn: null,
    user: null,
    inFocus: null,
    books: null,
    onLogin: () => {},
    onLogout: () => {},
    onIssuedFocus: () => {},
    onReturnedFocus: () => {},
    onReservedFocus: () => {},
    onPersonalFocus: () => {},
    onManageFocus: () => {},
    onBookQuery: () => {},
});

export const UserContextProvider = (props) => {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [inFocus, setInFocus] = useState("Issued Books");
    const [books, setBooks] = useState({ isLoaded: false, issued: [], returned: [], reserved: [] });

    const onLogin = (data) => {
        setIsLoggedIn(true);
        setUser(data);
        history.push("/profile/" + data.userName);
    };

    const onLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        history.push("/home");
    };

    const onIssuedFocus = () => {
        setInFocus("Issued Books");
    };

    const onReturnedFocus = () => {
        setInFocus("Returned Books");
    };

    const onReservedFocus = () => {
        console.log("Reserved Focus");
        setInFocus("Reserved Books");
    };

    const onPersonalFocus = () => {
        setInFocus("Personal Information");
    };

    const onManageFocus = () => {
        setInFocus("Manage Library");
    };

    const onBookQuery = async (section) => {
        setBooks((prevBooks) => {
            return { ...prevBooks, isLoaded: false };
        });

        window.scroll(0, 0);
        await fetch("http://localhost:5000/profile/" + user.userName, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const issuedBooks = [];
                const returnedBooks = [];
                const reservedBooks = [];
                for (let sa of data.booksissued) {
                    if (!sa.returned) {
                        issuedBooks.unshift({
                            tId: sa.id,
                            bookId: sa.bookid,
                            bookNumber: sa.booknumber,
                            bookName: sa.title,
                            author: sa.author,
                            cover: sa.image_url,
                            type: "Issued",
                            issuedOn: sa.issuedate,
                            expectedReturn: sa.expectedreturn,
                            isPrinted: sa.isPrinted,
                        });
                    } else {
                        returnedBooks.unshift({
                            bookId: sa.bookid,
                            bookNumber: sa.booknumber,
                            bookName: sa.title,
                            author: sa.author,
                            cover: sa.image_url,
                            type: "Returned",
                            issuedOn: sa.issuedate,
                            returnedOn: sa.returndate,
                            isDeleted: sa.isDeleted,
                        });
                    }
                }
                for (let sa of data.booksreserved) {
                    reservedBooks.unshift({
                        bookId: sa.bookid,
                        bookNumber: sa.booknumber,
                        bookName: sa.title,
                        author: sa.author,
                        cover: sa.image_url,
                        type: "Reserved",
                        issuedOn: sa.issuedate,
                        returnedOn: sa.returndate,
                        isDeleted: sa.isDeleted,
                        isAvailable: sa.isAvailable
                    });
                }
                console.log(reservedBooks);
                setBooks({ isLoaded: true, issued: issuedBooks, returned: returnedBooks, reserved: reservedBooks });
                setInFocus(section);
                history.push("/profile/" + user.userName);
            })
            .catch((error) => console.log(error));
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                user,
                inFocus,
                books,
                onLogin,
                onLogout,
                onIssuedFocus,
                onReservedFocus,
                onReturnedFocus,
                onPersonalFocus,
                onManageFocus,
                onBookQuery,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
