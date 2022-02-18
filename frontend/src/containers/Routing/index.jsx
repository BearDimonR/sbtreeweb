import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import NotFound from "../../scenes/NotFound";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import { Dimmer, Loader } from "semantic-ui-react";
import LoginPage from "../LoginPage";
import { loadCurrentUser } from "../LoginPage/actions";
import { applyEventSort, searchEvents } from "../EventsPage/actions";
import { applyPersonSort, searchPeople } from "../PeoplePage/actions";
import HomePage from "../HomePage";
import EventsPage from "../EventsPage";
import PeoplePage from "../PeoplePage";
import ProfilePage from "../ProfilePage";
import EventPage from "../EventPage";
import EventFilterWrapper from "../EventFilterWrapper";
import PersonFilterWrapper from "../PersonFilterWrapper";
import { eventsSortOptions, peopleSortOptions } from "../../utils/sortOptions";
import AboutPage from "../AboutPage";
import PersonPage from "../PersonPage";
import CallbackPage from "../CallbackPage";

const Routing = ({
  loadCurrentUser,
  applyEventSort: setEventSort,
  applyPersonSort: setPersonSort,
  searchEvents,
  searchPeople,
  ...props
}) => {
  const { isLoading } = useSelector((state) => state.profile);
  const eventSort = useSelector((state) => state.event.eventSort);
  const personSort = useSelector((state) => state.person.sort);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const spinner = () => (
    <Dimmer active inverted>
      <Loader size="massive" inverted />
    </Dimmer>
  );
  const content = () => (
    <div className="fill">
      <main className="fill">
        <Switch>
          <PublicRoute exact path="/login/callback" component={CallbackPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute
            exact
            path="/events"
            sortOptions={eventsSortOptions}
            sort={eventSort}
            setSort={setEventSort}
            filterComponent={EventFilterWrapper}
            component={EventsPage}
            handleSearch={searchEvents}
          />
          <PrivateRoute exact path="/events/:id" component={EventPage} />
          <PrivateRoute
            exact
            path="/people"
            sortOptions={peopleSortOptions}
            sort={personSort}
            setSort={setPersonSort}
            filterComponent={PersonFilterWrapper}
            component={PeoplePage}
            handleSearch={searchPeople}
          />
          <PrivateRoute exact path="/people/:id" component={PersonPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/home/about" component={AboutPage} />
          <PrivateRoute
            exact
            path=""
            component={() => (
              <Redirect
                to={{ pathname: "/home", state: { from: props.location } }}
              />
            )}
          />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </main>
    </div>
  );

  return isLoading ? spinner() : content();
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadCurrentUser,
      applyEventSort,
      applyPersonSort,
      searchEvents,
      searchPeople,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Routing);
