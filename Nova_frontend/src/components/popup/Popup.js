import classes from "./Popup.module.css";
import { useState } from "react";

const Popup = (props) => {
    return (
        <div className={`${classes["popup__container"]} ${props.isOpen ? classes["active"] : ""}`}>
            <div className={classes["popup"]}>
                <div className={classes["popup-title"]}>{props.title}</div>
                <div className={classes["rule"]}></div>
                <div className={classes["message"]}>{props.message}</div>
                <div className={classes["btn_group"]}>
                    {!props.hasSingleBtn && <button className={classes["btn_left"]} onClick={props.onClickLeft}>{props.left}</button>}
                    <button className={classes["btn_right"]} onClick={props.onClickRight}>{props.right}</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
