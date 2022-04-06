import { useState } from "react";
import classes from "./Browse.module.css";
import BookList from "../../components/booklist/BookList";
import BrowseForm from "../../components/browseform/BrowseForm";

const Browse = () => {
    const [bookData, setBookData] = useState({ isLoaded: false, foundBook: false, books: null, displayedBooks: null, index: 0 });

    const bookQueryEndHandler = (data) => {
        const thisBooks = [];
        if (data.foundBook) {
            for (let book of data.books) {
                if (book.isDeleted) continue;
                thisBooks.push({
                    bookId: book.bookid,
                    bookNumber: book.booknumber,
                    bookName: book.title,
                    author: book.author,
                    cover: book.image_url,
                    type: "Display"
                });
            }
        }
        setBookData({ isLoaded: true, books: thisBooks, foundBook: data.foundBook, noOfBooks: thisBooks.length, displayedBooks: thisBooks.slice(0, 50), index: 0 });
    };

    const indexIncreaseHandler = () => {
        console.log(bookData.books);
        if (bookData.index + 50 >= bookData.noOfBooks) return;
        setBookData({
            ...bookData,
            index: bookData.index + 50,
            displayedBooks: bookData.books.slice(bookData.index + 50, bookData.index + 100)
        });
    };

    const indexDecreaseHandler = () => {
        if (bookData.index < 50) return;
        setBookData({
            ...bookData,
            index: bookData.index - 50,
            displayedBooks: bookData.books.slice(bookData.index - 50, bookData.index)
        });
    };

    return (
        <div className={classes["browse__container"]}>
            <div className={classes["browse"]}>
                <BrowseForm onEndBookQuery={bookQueryEndHandler} />
                {bookData.isLoaded &&
                    (bookData.foundBook ? (
                        <BookList
                            title={`Found ${bookData.noOfBooks} books`}
                            books={bookData.displayedBooks}
                            lower={bookData.index + 1}
                            upper={bookData.index + 50 >= bookData.noOfBooks ? bookData.noOfBooks : bookData.index + 50}
                            onIndexIncrease={indexIncreaseHandler}
                            onIndexDecrease={indexDecreaseHandler}
                            navigation="Unlocked"
                        />
                    ) : (
                        <h1>No books found</h1>
                    ))}
            </div>
        </div>
    );
};

export default Browse;
