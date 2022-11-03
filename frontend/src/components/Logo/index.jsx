import React from "react";
import style from "./index.module.scss";

const Logo = ({ onClick }) => {
  return (
    <div className={style.logoContainer} onClick={onClick}>
      <p className={style.logo}>SBTree</p>
      <p className={style.logoSmall}>SB</p>
      <p className={style.subLogo}>web</p>
    </div>
  );
};

export default Logo;
