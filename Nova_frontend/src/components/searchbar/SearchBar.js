import classes from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState("");

    const searchTextChangeHandler = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className={classes.searchbar}>
            <div className={classes.searchbar__title}>Browse Our Books</div>
            <div className={classes["search__container"]}>
                <input
                    className={classes.searchbar__input}
                    type="text"
                    value={searchText}
                    placeholder={props.placeholder}
                    onChange={searchTextChangeHandler}
                ></input>
                <button onClick={() => props.onSubmit(searchText)} className={classes["go-btn"]}>Go</button>
            </div>
        </div>
    );
};

export default SearchBar;
