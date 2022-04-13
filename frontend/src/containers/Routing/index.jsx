import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../scenes/NotFound";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import { Dimmer, Loader } from "semantic-ui-react";
import LoginPage from "../LoginPage";
import { loadCurrentUser } from "../LoginPage/actions";
import HomePage from "../HomePage";
import EventsPage from "../EventsPage";
import PeoplePage from "../PeoplePage";
import ProfilePage from "../ProfilePage";
import EventPage from "../EventPage";
import AboutPage from "../AboutPage";
import PersonPage from "../PersonPage";
import CallbackPage from "../CallbackPage";
import TreePage from "../TreePage";
import CustomNode from "../CustomNode/CustomNode";

const Routing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  const spinner = () => (
    <Dimmer active inverted>
      <Loader size="massive" inverted />
    </Dimmer>
  );
  const content = () => (
    <div className="fill">
      <div className="fill">
        <Switch>
          <PublicRoute exact path="/login/callback" component={CallbackPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/events" component={EventsPage} />
          <PrivateRoute exact path="/events/:id" component={EventPage} />
          <PrivateRoute exact path="/people" component={PeoplePage} />
          <PrivateRoute exact path="/people/:id" component={PersonPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/about" component={AboutPage} />
          <PrivateRoute exact path="/tree" component={TreePage} />
          <PrivateRoute
            exact
            path=""
            component={() => (
              <Redirect to={{ pathname: "/home", state: { from: location } }} />
            )}
          />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </div>
  );

  return isLoading ? spinner() : content();
};

export default Routing;
