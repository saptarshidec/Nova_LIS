import { useEffect, useState } from "react";
import classes from "./ExpiredList.module.css";

import BookList from "../booklist/BookList";

const ReminderList = () => {

    const [bookData, setBookData] = useState({isLoaded: false, books: []});

    const responseHandler = (data) => {
        const thisBooks = [];
        for (let book of data.booksExpired) {
            if (book.isDeleted) continue;
            thisBooks.push({
                bookId: book.bookid,
                bookName: book.title,
                bookNumber: book.booknumber,
                author: book.author,
                cover: book.image_url,
                type: "Expired",
                isDeleted: book.isDeleted
            })
        }
        console.log(thisBooks);
        setBookData({ isLoaded: true, books: thisBooks});
    }

    const getExpiredBooksHandler = async (body) => {
        window.scroll(0, 0);
        return await fetch("http://localhost:5000/getExpiredBooks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => responseHandler(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => getExpiredBooksHandler(), []);

    return (
        <>
            {bookData.isLoaded && <BookList title={`${bookData.books.length} Obscure Books`} books={bookData.books} navigation="Locked"/>}
            {!bookData.isLoaded && <h1>Loading...</h1>}
        </>
    );
};

export default ReminderList;