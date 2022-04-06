import ExpiredList from "../../components/expiredlist/ExpiredList";
import classes from "./Expired.module.css";

const Expired = () => {
    return (
        <div className={classes["expired__container"]}>
            <ExpiredList />
        </div>
    );
};

export default Expired;