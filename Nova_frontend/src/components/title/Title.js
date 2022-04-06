import classes from "./Title.module.css";
import NavLink from "../navbar/Navbar";

import { useHistory } from "react-router-dom";

const Title = () => {

    const history = useHistory();

    const leftClickHandler = () => {
        history.push("/home");
    };

    const rightClickHandler = () => {
        history.push("/browse");
    }

    return (
        <section className={classes["title"]}>
            <h1 className={classes["heading"]}>LIS</h1>
            <h2 className={classes["desc"]}>Simplicity. Redefined.</h2>
            <div className={classes["title-btn__group"]}>
                <button onClick={leftClickHandler} className={`${classes["title-btn"]} ${classes["left"]}`}>
                    Discover your Destiny
                </button>
                <button onClick={rightClickHandler} className={`${classes["title-btn"]} ${classes["right"]}`}>
                    Surf the Library
                </button>
            </div>
        </section>
    );
};

export default Title;
