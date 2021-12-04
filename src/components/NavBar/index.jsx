import React from 'react';
import {NavLink} from 'react-router-dom';
import style from "./index.module.scss";
import {BiCollection, BiHomeAlt, BiGroup, BiLogOutCircle} from "react-icons/bi";

const Navbar = ({logout}) => {
    const signOut = () => {
        logout();
    }
    return <div className={style.navbarContainer}>
        <div className={style.menuLeftContainer}>
            <div className={style.logoContainer}>
                <p className={style.logo}>SBTree</p>
                <p className={style.logoSmall}>SB</p>
                <p className={style.subLogo}>web</p>
            </div>
            <NavLink exact activeClassName={style.menuItemActive} to="/" className={style.menuItem}>
                <BiHomeAlt className={style.menuItemIcon}/>
                <p className={style.menuItemText}>Home</p>
            </NavLink>
            <NavLink exact activeClassName={style.menuItemActive} to="/events" className={style.menuItem}>
                <BiCollection className={style.menuItemIcon}/>
                <p className={style.menuItemText}>Events</p>
            </NavLink>
            <NavLink exact activeClassName={style.menuItemActive} to="/people" className={style.menuItem}>
                <BiGroup className={style.menuItemIcon}/>
                <p className={style.menuItemText}>People</p>
            </NavLink>
        </div>
        <div style={{marginBottom: "30px"}} onClick={signOut} className={style.menuItem}>
            <BiLogOutCircle className={style.menuItemIcon}/>
            <p className={style.menuItemText}>Log out</p>
        </div>
    </div>
}

export default Navbar;