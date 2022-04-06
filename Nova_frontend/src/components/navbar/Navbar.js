import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import ScrollContext from "../../store/scroll-context";
import UserContext from "../../store/user-context";
import classes from "./Navbar.module.css";

import logo from "./imgs/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPassport } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    // const scrollCtx = useContext(ScrollContext);
    // const darkCtx = useContext(DarkContext);
    // const userCtx = useContext(UserContext);

    // const loginRegisterBtns = (
    //     <>
    //         <a
    //             href="/login"
    //             className={
    //                 `${classes["nav-btn"]}  ${classes["nav-btn__login"]}` +
    //                 (darkCtx.theme.mode === "dark" ? " " + classes["nav-btn__dark"] : "")
    //             }
    //         >
    //             Login
    //         </a>
    //         <a
    //             href="/register"
    //             className={
    //                 `${classes["nav-btn"]} ${classes["nav-btn__register"]}` +
    //                 (darkCtx.theme.mode === "dark" ? " " + classes["nav-btn__register__dark"] : "")
    //             }
    //         >
    //             Register
    //         </a>
    //     </>
    // );

    // const profileLogoutBtns = (
    //     <>
    //         <a href="/profile" className={classes["profile-img__container"]}>
    //             <img src="profile.png" alt="avatar" className={classes["profile-img"]} />
    //         </a>
    //         <a
    //             href="/home"
    //             className={
    //                 `${classes["nav-btn"]} ${classes["nav-btn__register"]}` +
    //                 (darkCtx.theme.mode === "dark" ? " " + classes["nav-btn__register__dark"] : "")
    //             }
    //             onClick={userCtx.onLogout}
    //         >
    //             Logout
    //         </a>
    //     </>
    // );

    const scrollCtx = useContext(ScrollContext);
    const userCtx = useContext(UserContext);

    const logoutBtn = (
        <div className={classes["nav-btn__group"]}>
            <NavLink
                to={"/profile/" + (userCtx.user ? userCtx.user.userName : "")}
                className={classes["profile"]}
            ></NavLink>
            <div className={`${classes["nav-btn"]} ${classes["logout"]}`} onClick={userCtx.onLogout}>
                Logout
            </div>
        </div>
    );

    const loginRegisterBtns = (
        <div className={classes["nav-btn__group"]}>
            <NavLink to="/login" className={`${classes["nav-btn"]} ${classes["login"]}`}>
                Login
            </NavLink>
            <NavLink to="/register" className={`${classes["nav-btn"]} ${classes["register"]}`}>
                Register
            </NavLink>
        </div>
    );

    const menuToggleIcon = !scrollCtx.isSecondaryNavOpen ? (
        <svg viewBox="0 0 100 80" width="40" height="40" className={classes["hamburger"]}>
            <rect width="100" height="10" className={classes["hamburger__bar"]} />
            <rect y="25" width="100" height="10" className={classes["hamburger__bar"]} />
            <rect y="50" width="100" height="10" className={classes["hamburger__bar"]} />
        </svg>
    ) : (
        <svg viewBox="0 0 100 80" width="40" height="40" className={classes["close"]}>
            <line x1="0" y1="0" x2="100" y2="80" className={classes["close__fragment"]} />
            <line x1="0" y1="80" x2="100" y2="0" className={classes["close__fragment"]} />
        </svg>
    );

    const secondaryHeaderClasses =
        classes["secondary-header"] + (scrollCtx.isSecondaryNavOpen ? " " + classes["active"] : "");
    return (
        <header className={classes["navbar"]}>
            <header className={classes["primary-header"]}>
                <div className={classes["logo-container"]}>
                    <img src={logo} alt="Nova" className={classes["logo-img"]} />
                </div>
                <button className={classes["nav-toggle"]} onClick={scrollCtx.onToggleSecondaryNav}>
                    {menuToggleIcon}
                </button>
                <nav className={classes["primary-navigation"]}>
                    <ul className={classes["primary-navigation__list"]}>
                        <li>
                            <NavLink to="/home" className={classes["primary-navigation__link"]}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/browse" className={classes["primary-navigation__link"]}>
                                Browse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={classes["primary-navigation__link"]}>
                                About Nova LIS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={classes["primary-navigation__link"]}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/faqs" className={classes["primary-navigation__link"]}>
                                FAQs
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {userCtx.isLoggedIn ? logoutBtn : loginRegisterBtns}
            </header>
            <header className={secondaryHeaderClasses}>
                <ul className={classes["secondary-navigation__list"]}>
                    <li>
                        <NavLink to="/home" className={classes["secondary-navigation__link"]}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/browse" className={classes["secondary-navigation__link"]}>
                            Browse
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={classes["secondary-navigation__link"]}>
                            About Nova LIS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={classes["secondary-navigation__link"]}>
                            Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/faqs" className={classes["secondary-navigation__link"]}>
                            FAQs
                        </NavLink>
                    </li>
                    {!userCtx.isLoggedIn && (
                        <li>
                            <NavLink to="/login" className={classes["secondary-navigation__link"]}>
                                Login
                            </NavLink>
                        </li>
                    )}
                    {!userCtx.isLoggedIn && (
                        <li>
                            <NavLink to="/login" className={classes["secondary-navigation__link"]}>
                                Register
                            </NavLink>
                        </li>
                    )}
                    {userCtx.isLoggedIn && (
                        <li>
                            <NavLink
                                to={"/profile/" + (userCtx.user ? userCtx.user.userName : "")}
                                className={classes["secondary-navigation__link"]}
                            >Profile</NavLink>
                        </li>
                    )}
                    {userCtx.isLoggedIn && (
                        <li>
                            <div className={classes["secondary-navigation__link"]} onClick={userCtx.onLogout}>
                                Logout
                            </div>
                        </li>
                    )}
                </ul>
            </header>
        </header>
    );
};

export default Navbar;
