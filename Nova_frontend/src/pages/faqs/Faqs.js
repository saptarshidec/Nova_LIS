import classes from "./Faqs.module.css";

const FAQs = [
    {
        query: "How many books can I borrow?",
        answer: "UG Student: 2 books for 1 month  PG Student: 4 books for 1 month  Research Scholar: 6 books for 3 months  Faculty: 10 books for 6 months" 
    },
    {
        query: "How do I reserve a book?",
        answer: "If no copies of a particular book is currently available for issuance, you can reserve a copy from LIS. You should keep checking the website frequently to check if the book has become available. AN USER WHO HAS RESERVED THE BOOK AFTER YOU MIGHT CLAIM THE BOOK WHEN IT BECOMES AVAILABLE AFTER YOU, IN THAT CASE THE BOOK WILL BE ISSUED TO THE FORMER ONLY. "
    },
    {
        query: "What is the return and fine policy?",
        answer: " You can return an issued book from the library using LIS under the above mentioned limits. \n If a book is not returned before the expected deadline, a penalty is incurred on the user. This penalty is ₹50 for the first week, ₹100 for the next week and so on for a single book. If multiple books are not returned, a penalty is incurred on each book and the user has to pay the total penalty."
    },
    {
        query: "I don't find a book in its designated rack. What should I do?",
        answer: "Ask staff at the Service Desk for help - there are many places a book might be before it gets to its proper shelf."
    },
    {
        query: "How to withdraw my membership?",
        answer: "Write a email to Librarian at lib@gmail.com requesting the same."
    }
];


const Faqs = () => {
    return (
        <div className={classes["faqs__container"]}>
            <div className={classes["faqs"]}>
                <ul className={classes["faqs-list"]}>
                    {FAQs.map((faq, index) => {
                        return (
                            <li key={index} className={classes["block"]}>
                                <div className={classes["query"]}>{faq.query}</div>
                                <div className={classes["answer"]}>{faq.answer}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Faqs;

