import classes from "./BookForm.module.css";
import useInput from "../../hooks/use-input";

import { useState } from "react";
import { useHistory } from "react-router-dom";

const isNotEmpty = (value) => value.trim() !== "";
const isNotNegative = (value) => +value >= 0 && isNotEmpty(value);
const isValidYear = (value) => ((value <= (new Date()).getFullYear()) && isNotNegative(value) && isNotEmpty(value));

const BookForm = () => {

    const history = useHistory();

    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleInputBlurHandler,
        reset: resetTitle,
    } = useInput(isNotEmpty);

    const {
        value: author,
        isValid: authorIsValid,
        hasError: authorInputHasError,
        valueChangeHandler: authorChangeHandler,
        inputBlurHandler: authorInputBlurHandler,
        reset: resetAuthor,
    } = useInput(isNotEmpty);

    const {
        value: year,
        isValid: yearIsValid,
        hasError: yearInputHasError,
        valueChangeHandler: yearChangeHandler,
        inputBlurHandler: yearInputBlurHandler,
        reset: resetYear,
    } = useInput(isValidYear);

    const {
        value: isbn,
        isValid: isbnIsValid,
        hasError: isbnInputHasError,
        valueChangeHandler: isbnChangeHandler,
        inputBlurHandler: isbnInputBlurHandler,
        reset: resetIsbn,
    } = useInput(isNotNegative);

    const {
        value: copies,
        isValid: copiesIsValid,
        hasError: copiesInputHasError,
        valueChangeHandler: copiesChangeHandler,
        inputBlurHandler: copiesInputBlurHandler,
        reset: resetCopies,
    } = useInput(isNotNegative);

    const {
        value: url,
        isValid: urlIsValid,
        hasError: urlInputHasError,
        valueChangeHandler: urlChangeHandler,
        inputBlurHandler: urlInputBlurHandler,
        reset: resetUrl,
    } = useInput(isNotEmpty);

    const [titleExists, setTitleExists] = useState(false);
    const [isbnExists, setIsbnExists] = useState(false);

    let formIsValid = false;
    if (
        titleIsValid &&
        authorIsValid &&
        yearIsValid &&
        isbnIsValid &&
        urlIsValid &&
        copiesIsValid &&
        !titleExists &&
        !isbnExists
    )
        formIsValid = true;

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const titleInputClasses = titleInputHasError || titleExists ? errorClasses : normalClasses;
    const authorInputClasses = authorInputHasError ? errorClasses : normalClasses;
    const yearInputClasses = yearInputHasError ? errorClasses : normalClasses;
    const isbnInputClasses = isbnInputHasError || isbnExists ? errorClasses : normalClasses;
    const copiesInputClasses = copiesInputHasError ? errorClasses : normalClasses;
    const urlInputClasses = urlInputHasError ? errorClasses : normalClasses;

    const [isAdding, setIsAdding] = useState(false);

    const insertBookResponseHandler = (data) => {
        setIsAdding(false);
        if (data.accepted) {
            history.push("/registersuccess/" + "Successfully added book to library.");
        } else {
            setTitleExists(data.titleExists);
            setIsbnExists(data.isbnExists);
        }
    };

    const insertBook = async (body) => {
        setIsAdding(true);
        window.scroll(0, 0);
        return await fetch("http://localhost:5000/registerBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {insertBookResponseHandler(data); return data;})
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const book = {
            title: title.trim(),
            author: author.trim(),
            published_date: year,
            isbn,
            no_of_copies: copies,
            image_url: url,
            small_image_url: url
        };

        insertBook(book).then((data) => {
            if (!data.titleExists) resetTitle();
            resetAuthor();
            resetYear();
            if (!data.isbnExists) resetIsbn();
            resetCopies();
            resetUrl();
        });
    };

    const masterTitleChangeHandler = (event) => {
        titleChangeHandler(event);
        setTitleExists(false);
    }

    const masterIsbnChangeHandler = (event) => {
        isbnChangeHandler(event);
        setIsbnExists(false);
    }

    const Loader = <h1 className={classes["registering"]}>Adding book to database...</h1>;

    if (!isAdding) {
        return (
            <form className={`${classes["form"]}`} autoComplete="off" onSubmit={submitHandler}>
                <h1 className={classes["form__title"]}>Add book to Nova LIS</h1>
                <div className={`${classes["form__inputs"]}`}>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="name">
                            Title
                        </label>
                        <input
                            className={titleInputClasses}
                            id="title"
                            type="text"
                            value={title}
                            name="title"
                            onChange={masterTitleChangeHandler}
                            onBlur={titleInputBlurHandler}
                        />
                        {(titleInputHasError || titleExists) && (
                            <p className={classes["input__message"]}>
                                {titleInputHasError
                                    ? "Title cannot be empty."
                                    : "Title already exists."}
                            </p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="roll">
                            Author
                        </label>
                        <input
                            className={authorInputClasses}
                            id="author"
                            type="text"
                            value={author}
                            name="author"
                            onChange={authorChangeHandler}
                            onBlur={authorInputBlurHandler}
                        />
                        {authorInputHasError && <p className={classes["input__message"]}>
                                Author name must not be empty.
                            </p>}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="email">
                            Year of Publication
                        </label>
                        <input
                            className={yearInputClasses}
                            id="copies"
                            type="number"
                            value={year}
                            name="copies"
                            onChange={yearChangeHandler}
                            onBlur={yearInputBlurHandler}
                        />
                        {yearInputHasError &&  <p className={classes["input__message"]}>
                                Please choose a valid year.
                            </p>
                        }
                    </div>          
                    <div className={`${classes["input"]}`}>
                        <label className={`${classes["input__label"]}`} htmlFor="password">
                            ISBN
                        </label>
                        <input
                            className={isbnInputClasses}
                            id="isbn"
                            type="number"
                            value={isbn}
                            name="isbn"
                            onChange={masterIsbnChangeHandler}
                            onBlur={isbnInputBlurHandler}
                        />
                        {(isbnInputHasError || isbnExists) && (
                            <p className={classes["input__message"]}>
                                {isbnInputHasError
                                    ? "ISBN cannot be empty or negative."
                                    : "ISBN already exists."}
                            </p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="email">
                            Copies
                        </label>
                        <input
                            className={copiesInputClasses}
                            id="copies"
                            type="number"
                            value={copies}
                            name="copies"
                            onChange={copiesChangeHandler}
                            onBlur={copiesInputBlurHandler}
                        />
                        {copiesInputHasError &&  <p className={classes["input__message"]}>
                                Copies cannot be empty or nagative.
                            </p>
                        }
                    </div>
                    <div className={classes["input"]}>
                        <label className={`${classes["input__label"]}`} htmlFor="email">
                            Cover Image Url
                        </label>
                        <input
                            className={urlInputClasses}
                            id="url"
                            type="text"
                            value={url}
                            name="url"
                            onChange={urlChangeHandler}
                            onBlur={urlInputBlurHandler}
                        />
                        {urlInputHasError &&  <p className={classes["input__message"]}>
                                Url cannot be empty.
                            </p>
                        }
                    </div>
                </div>
                <div className={`${classes["form__btn-group"]}`}>
                    <button
                        className={`${classes["form__btn"]}`}
                        // disabled={!formIsValid}
                    >
                        Add Book
                    </button>
                </div>
            </form>
        );
    } else {
        return Loader;
    }
};

export default BookForm;