import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";
import {
  BiCollection,
  BiGroup,
  BiLogOutCircle,
  BiSitemap,
  BiLogInCircle,
} from "react-icons/bi";
import Logo from "../Logo";
import { localization } from "../../utils/localization";
import { LANDING_URL } from "../../helpers/constants";

const Navbar = ({ logout }) => {
  const history = useHistory();
  const user = useSelector((state) => state.profile.user);

  const signOut = () => {
    logout();
    history.push("/tree");
  };

  const login = () => {
    history.push("/login");
  };

  const redirectToLanding = () => {
    window.location.href = LANDING_URL;
  };

  return (
    <div className={style.navbarContainer}>
      <Logo onClick={redirectToLanding} />
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/tree"
      >
        <BiSitemap className={style.menuItemIcon} />
        <p>{localization.tree}</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/events"
      >
        <BiCollection className={style.menuItemIcon} />
        <p>{localization.events}</p>
      </NavLink>
      <NavLink
        exact
        activeClassName={style.menuItemActive}
        className={style.menuItem}
        to="/people"
      >
        <BiGroup className={style.menuItemIcon} />
        <p>{localization.people}</p>
      </NavLink>
      {user && (
        <div className={style.menuItem} onClick={signOut}>
          <BiLogOutCircle className={style.menuItemIcon} />
          <p>{localization.logOut}</p>
        </div>
      )}
      {!user && (
        <div className={style.menuItem} onClick={login}>
          <BiLogInCircle className={style.menuItemIcon} />
          <p>{localization.login}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
