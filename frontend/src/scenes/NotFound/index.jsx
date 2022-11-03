import React from "react";
import style from "./index.module.scss";
import { NavLink } from "react-router-dom";

const NotFound = () => (
  <div className={style.container}>
    <image className={style.image} src="/404.png" />
    <p className={style.title}>Page Not Found</p>
    <NavLink className={style.redirect} to="/">
      {" "}
      Go to tree page
    </NavLink>
  </div>
);

export default NotFound;
