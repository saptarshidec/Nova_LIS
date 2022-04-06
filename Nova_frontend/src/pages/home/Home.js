import Title from "../../components/title/Title";
// import Suggestion from "../../components/suggestion/Suggestion";
import Browse from "../browse/Browse"
import classes from "./Home.module.css";

const Home = () => {
    return (
        <div className={classes["home"]}>
            {/* <Browse /> */}
            <Title />
            {/* <Suggestion /> */}
        </div>
    );
};

export default Home;
