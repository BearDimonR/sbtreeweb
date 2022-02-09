import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const CallbackPage = (props) => {
  useEffect(() => {
    fetch(`/api/auth/login/callback${props.location.search}`).then(async (response) => {
      const j = await response.json()
      debugger;
      localStorage.setItem('result', 'hooray');
    })
  }, []);
  return  <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
};

export default CallbackPage;
