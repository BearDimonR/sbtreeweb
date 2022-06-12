import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";
import {
  BiCollection,
  BiHomeAlt,
  BiGroup,
  BiLogOutCircle,
  BiSitemap,
  BiInfoCircle,
  BiLogInCircle,
} from "react-icons/bi";
import Logo from "../Logo";

const Navbar = ({ logout }) => {
  const history = useHistory();
  const user = useSelector((state) => state.profile.user);
  const signOut = () => {
    logout();
    history.push('/home')
  };
  const login = () => {
    history.push('/login')
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
      {
        user &&
      <div className={style.menuItem} onClick={signOut}>
        <BiLogOutCircle className={style.menuItemIcon} />
        <p>Log out</p>
      </div>
      }
      {
        !user &&
      <div className={style.menuItem} onClick={login}>
        <BiLogInCircle className={style.menuItemIcon} />
        <p>Login</p>
      </div>
      }
    </div>
  );
};

export default Navbar;
