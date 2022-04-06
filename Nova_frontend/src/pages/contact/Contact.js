import classes from "./Contact.module.css";

import ritwikImg from "./imgs/ritwik.jpg";
import rounakImg from "./imgs/rounak.jpg";
import saptarshiImg from "./imgs/saptarshi.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
    return (
        <div className={classes["contact__container"]}>
            <div className={classes["contact"]}>
                <div className={classes["contact-block"]}>
                    <div className={classes["img__container"]}>
                        <img src={ritwikImg} alt="ritwik" className={classes["img"]}/>
                    </div>
                    <div className={classes["info"]}>
                        <p className={classes["name"]}>Ritwik Ranjan Mallik</p>
                        <p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp; &nbsp;mallikritwik2014@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp; &nbsp;8617290014</p>
                    </div>
                </div>
                <div className={classes["contact-block"]}>
                    <div className={classes["img__container"]}>
                        <img src={rounakImg} alt="rounak" className={classes["img"]}/>
                    </div>
                    <div className={classes["info"]}>
                        <p className={classes["name"]}>Rounak Saha</p>
                        <p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> &nbsp; &nbsp; rounaksaha12@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp; &nbsp; 6297272095</p>
                    </div>
                </div>
                <div className={classes["contact-block"]}>
                    <div className={classes["img__container"]}>
                        <img src={saptarshiImg} alt="saptarshi" className={classes["img"]}/>
                    </div>
                    <div className={classes["info"]}>
                        <p className={classes["name"]}>Saptarshi De Chaudhury</p>
                        <p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp; &nbsp;saptarshi_dechaudhury@outlook.com</p>
                        <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp; &nbsp;9051045291</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
