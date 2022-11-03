import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import callWebApi from "../../helpers/webApiHelper";
import { localization } from "../../utils/localization";
import { errorHandler } from "../../utils/shared";
import { setUser } from "../LoginPage/actions";
import style from "./index.module.scss";

const CallbackPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    callWebApi({
      endpoint: `/api/auth/login/callback${props.location.search}`,
    })
      .then(async (response) => {
        const body = await response.json();
        dispatch(setUser(body.auth));
        localStorage.setItem("token", body.token);
        history.push("/tree");
      })
      .catch((error) => {
        if (error.status === 401) {
          errorHandler(localization.doNotHaveAccess)({
            message: "",
          });
        } else {
          errorHandler(localization.internalServerError)({ message: "" });
        }
        history.push("/login");
      });
  }, [dispatch, history, props.location.search]);

  return (
    <div className={style.callbackPageContainer}>
      <p className={style.title}>{localization.pendingResponse}</p>
    </div>
  );
};

export default CallbackPage;
