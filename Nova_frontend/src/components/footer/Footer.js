import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";

import logo from "./imgs/logo.png";

const Footer = () => {
    return (
        <div className={classes["footer"]}>
            <h1 className={classes["footer__title"]}>Nova</h1>
            <div className={classes["footer__content"]}>
                <div className={classes["info-block"]}>
                    <h2>EXPLORE</h2>
                    <ul className={classes["footer-list"]}>
                        <li>
                            <NavLink to="/home" className={classes["link"]}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/browse" className={classes["link"]}>
                                Browse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={classes["link"]}>
                                About Nova LIS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={classes["link"]}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/faqs" className={classes["link"]}>
                                FAQs
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={classes["info-block"]}>
                    <img src={logo} alt="logo" className={classes["logo-img"]} />
                    <div>
                        Simplicity. Redefined.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
