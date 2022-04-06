import ReminderList from "../../components/reminderlist/ReminderList";
import classes from "./Reminder.module.css";

const Reminder = () => {
    return (
        <div className={classes["reminder__container"]}>
            <ReminderList />
        </div>
    );
};

export default Reminder;
