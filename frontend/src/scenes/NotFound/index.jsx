import React from "react";
import style from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { localization } from "../../utils/localization";

const NotFound = () => (
  <div className={style.container}>
    <image className={style.image} src="/404.png" />
    <p className={style.title}>{localization.pageNotFound}</p>
    <NavLink className={style.redirect} to="/">
      {" "}
      {localization.goToTheTree}
    </NavLink>
  </div>
);

export default NotFound;
