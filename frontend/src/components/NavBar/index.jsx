import React from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";
import {
  BiCollection,
  BiHomeAlt,
  BiGroup,
  BiLogOutCircle,
  BiSitemap,
  BiInfoCircle,
} from "react-icons/bi";
import Logo from "../Logo";

const Navbar = ({ logout }) => {
  const signOut = () => {
    logout();
  };
  return (
    <div className={style.navbarContainer}>
      <Logo />
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/home"
      >
        <BiHomeAlt className={style.menuItemIcon} />
        <p>Home</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/tree"
      >
        <BiSitemap className={style.menuItemIcon} />
        <p>Tree</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/events"
      >
        <BiCollection className={style.menuItemIcon} />
        <p>Events</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/people"
      >
        <BiGroup className={style.menuItemIcon} />
        <p>People</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/about"
      >
        <BiInfoCircle className={style.menuItemIcon} />
        <p>About</p>
      </NavLink>
      <div className={style.menuItem} onClick={signOut}>
        <BiLogOutCircle className={style.menuItemIcon} />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Navbar;
