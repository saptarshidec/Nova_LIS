import classes from "./About.module.css";

const About = () => {
    return (
        <div className={classes["about__container"]}>
            <div className={classes["about"]}>
                {/* <p className={classes["content-block"]}>
                    <div className={classes["text"]}>
                        The Nova LIS is a full-fledged automation software for a modern library. It is designed to
                        manage a large number of books in the library and processes a broad range of queries from users
                        of various types. Some of these queries include issuing a book, returning an issued book,
                        reservation of books etc. Five types of registered users are allowed.
                    </div>
                </p>
                <div classes={classes["content-group"]}>
                    <p className={classes["content-block"]}>
                        <div className={classes["text"]}>
                            Different activities of the library of our institute pertaining to the issue and return of
                            the books by the members of the library and various queries regarding books as listed below
                            are to be automated.
                        </div>
                    </p>
                    <p className={classes["content-block"]}>
                        <div className={classes["text"]}>
                            Different activities of the library of our institute pertaining to the issue and return of
                            the books by the members of the library and various queries regarding books as listed below
                            are to be automated.
                        </div>
                    </p>
                </div> */}
                <div className={classes["content-group"]}>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            The LIS is a full-fledged automation software for a modern library. It is designed to manage
                            a large number of books in the library and processes a broad range of queries from users of
                            various types. Some of these queries include issuing a book, returning an issued book,
                            reservation of books etc. Five types of registered users can access the library.
                        </p>
                    </div>
                </div>
                <div className={classes["content-group"]}>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            UG Student <br /> 2 books for 1 month
                        </p>
                    </div>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            PG Student <br /> 4 books for 1 month
                        </p>
                    </div>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            Reserch Scholar <br /> 6 books for 3 month
                        </p>
                    </div>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            Faculty <br /> 10 books for 6 month
                        </p>
                    </div>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            Librarian <br /> Admin access
                        </p>
                    </div>
                </div>
                <div className={classes["content-group"]}>
                    <div className={classes["content-block"]}>
                        <p className={classes["text"]}>
                            If a book is not returned before the expected deadline, a penalty is incurred on the user.
                            This penalty is ₹50 for the first week, ₹100 for the next week and so on for a single book.
                            If multiple books are not returned, a penalty is incurred on each book and the user has to
                            pay the total penalty.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
