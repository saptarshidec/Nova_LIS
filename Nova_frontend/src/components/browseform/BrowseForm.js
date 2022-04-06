import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import classes from "./BrowseForm.module.css";

const BrowseForm = (props) => {

    const bookRequestHandler = async (body) => {
        window.scroll(0, 0);
        return await fetch("http://localhost:5000/browse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {props.onEndBookQuery(data);})
            .catch((error) => console.log(error, "Hi"));
    };

    const submitHandler = (bookname) => {

        const data = {
            bookname
        };

        bookRequestHandler(data);
    };

    return (
        <SearchBar placeholder={"Search by title"} onSubmit={submitHandler}/>
    );
};

export default BrowseForm;
