import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../scenes/NotFound";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import { Dimmer, Loader } from "semantic-ui-react";
import LoginPage from "../LoginPage";
import { loadCurrentUser } from "../LoginPage/actions";
import EventsPage from "../EventsPage";
import PeoplePage from "../PeoplePage";
import ProfilePage from "../ProfilePage";
import EventPage from "../EventPage";
import PersonPage from "../PersonPage";
import CallbackPage from "../CallbackPage";
import TreePage from "../TreePage";

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
          <PublicRoute exact path="/events" container component={EventsPage} />
          <PublicRoute exact path="/events/:id" container component={EventPage} />
          <PublicRoute exact path="/people" container component={PeoplePage} />
          <PublicRoute exact path="/people/:id" container component={PersonPage} />
          <PrivateRoute exact path="/profile" container component={ProfilePage} />
          <PublicRoute exact path="/tree" container component={TreePage} />
          <PublicRoute exact path="/tree/integrated" component={TreePage} />
          <PublicRoute
            exact
            path=""
            component={() => (
              <Redirect to={{ pathname: "/tree", state: { from: location } }} />
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
