import classes from "./Book.module.css";

import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Book = () => {
    const params = useParams();

    const [bookData, setBookData] = useState({ isLoaded: false, book: null });

    const getBookDetailsHandler = async () => {
        await fetch("http://localhost:5000/book/" + params.bookId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBookData({ isLoaded: true, book: data });
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getBookDetailsHandler();
    }, []);

    const content = bookData.isLoaded ? (
        <div className={classes["book"]}>
            <div className={classes["img__container"]}>
                <img src={bookData.book.image_url} alt="book" className={classes["cover"]} />
                {/* <button className={classes["issue"]}>Issue</button> */}
            </div>
            <div className={classes["info"]}>
                <p className={`${classes["info-block"]} ${classes["title"]}`}>{bookData.book.title}</p>
                <p className={`${classes["info-block"]} ${classes["author"]}`}>by {bookData.book.author}</p>
                <p className={`${classes["info-block"]} ${classes["date"]}`}>{bookData.book.published_date}</p>
                <p className={`${classes["info-block"]} ${classes["copies"]}`}>
                    {bookData.book.no_of_copies} {+bookData.book.no_of_copies === 1 ? "copy" : "copies"}
                </p>
                <p className={`${classes["info-block"]} ${classes["rack"]}`}>Rack {bookData.book.racknumber}</p>
                <p className={`${classes["info-block"]} ${classes["isbn"]}`}>ISBN {bookData.book.isbn}</p>
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    );

    return <div className={classes["book__container"]}>{content}</div>;
};

export default Book;
