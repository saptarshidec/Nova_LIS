import { useEffect, useState } from "react";
import classes from "./ReminderList.module.css";

import BookList from "../booklist/BookList";

const ReminderList = () => {

    const [bookData, setBookData] = useState({isLoaded: false, books: []});

    const responseHandler = (data) => {
        const thisBooks = [];
        for (let book of data) {
            thisBooks.push({
                bookName: book.title,
                cover: book.image_url,
                userName: book.username,
                issuedOn: book.issuedate,
                expectedReturn: book.expectedreturn,
                tId: book.id,
                isOverdue: book.isOverdue,
                isPrinted: book.isPrinted,
                type: "Reminder"
            })
        }
        setBookData({ isLoaded: true, books: thisBooks});
    }

    const getUnreturnedBooksHandler = async (body) => {
        window.scroll(0, 0);
        return await fetch("http://localhost:5000/unreturnedBooks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => responseHandler(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => getUnreturnedBooksHandler(), []);

    return (
        <>
            {bookData.isLoaded && <BookList title={`${bookData.books.length} Unreturned Books`} books={bookData.books} navigation="Locked"/>}
            {!bookData.isLoaded && <h1>Loading...</h1>}
        </>
    );
};

export default ReminderList;