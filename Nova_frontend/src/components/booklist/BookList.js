import BookCard from "../bookcard/BookCard";
import classes from "./BookList.module.css";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookList = (props) => {
    const navigation = (
        <div className={classes["navigation"]}>
            <div onClick={props.onIndexDecrease} className={classes["arrow"]}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <p className={classes["index"]}>{`${props.lower} - ${props.upper}`}</p>
            <div onClick={props.onIndexIncrease} className={classes["arrow"]}>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
    );

    let o = new Intl.DateTimeFormat("en" , {
        timeStyle: "short",
        dateStyle: "long"
    });
    console.log(props.books.length);

    return (
        <div className={classes["booklist"]}>
            <div className={classes["header"]}>
                <h2 className={classes["booklist__title"]}>{props.title}</h2>
                {props.navigation === "Unlocked" && navigation}
            </div>
            <div className={classes["booklist__rule"]}></div>
            <ul className={classes["booklist__list"]}>
                {props.books.map((book, index) => {
                    return (
                        <li key={index}>
                            <BookCard
                                id={book.bookId}
                                tId={book.tId}
                                key={book.tId}
                                userName={book.userName}
                                number={book.bookNumber}
                                bookName={book.bookName}
                                author={book.author}
                                cover={book.cover}
                                type={book.type}
                                issuedOn={(book.type === "Issued" || book.type === "Returned" || book.type == "Reminder") ? o.format(new Date(new Date(book.issuedOn).toISOString())) : ""}
                                expectedReturn={(book.type === "Issued" || book.type === "Reminder") ? o.format(new Date(new Date(book.expectedReturn).toISOString())): ""}
                                returnedOn={(book.type === "Returned") ? o.format(new Date(new Date(book.returnedOn).toISOString())): ""}
                                isPrinted={book.isPrinted}
                                isDeleted={book.isDeleted}
                                isAvailable={book.isAvailable}
                                isOverdue={book.isOverdue}
                            />
                        </li>
                    );
                })}
            </ul>
            <div className={classes["header"]}>{props.navigation === "Unlocked" && navigation}</div>
        </div>
    );
};

export default BookList;
