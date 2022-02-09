import React from "react";
import { useDispatch } from "react-redux";
import style from "./index.module.scss";
import { login } from "./actions";

const LandingPage = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () =>{
    debugger;
    dispatch(login());
  } 

  return (
    <div className={style.loginPageContainer}>
      <div className={style.loginCard}>
        <p className={style.title}>Login</p>
        <img className={style.image} src="/log.png" alt="" />
        <div onClick={handleLoginClick} className={style.buttonContainer}>
          <img src="/google.png" alt="" />
          <p>Login with Google</p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
