import classes from "./Message.module.css";

const Message = (props) => {
    return (
        <div className={classes["container"]}>
            <h1 className={classes["title"]}>{props.title}</h1>
        </div>
    );
};

export default Message;
