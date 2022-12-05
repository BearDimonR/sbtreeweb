import React from "react";
import style from "./index.module.scss";
import { login } from "../../services/authService";
import { localization } from "../../utils/localization";

const LandingPage = () => {
  const handleLoginClick = () => login();

  return (
    <div className={style.loginPageContainer}>
      <div className={style.loginCard}>
        <div className={style.titleContainer}>
          <p className={style.title}>SBTree</p>
          <p className={style.subTitle}>web</p>
        </div>
        <img className={style.image} src="/login_image.png" alt="" />
        <div onClick={handleLoginClick} className={style.buttonContainer}>
          <img src="/google.png" alt="" />
          <p>{localization.loginWithGoogle}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
