import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NotFound from "../../scenes/NotFound";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import PropTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";
import LoginPage from "../LoginPage";
import { checkLoggedIn } from "../LoginPage/actions";
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
import { errorHandler } from "../../utils/shared";

const Routing = ({
  access,
  checkLoggedIn: checkLogged,
  isLoading,
  eventSort,
  personSort,
  applyEventSort: setEventSort,
  applyPersonSort: setPersonSort,
  searchEvents,
  searchPeople,
  ...props
}) => {
  useEffect(() => {
    checkLogged().catch(errorHandler("Error in check auth info"));
  }, [checkLogged]);

  console.log('\n  CREATE TABLE "TEST"."TYPES" \n   (\t"CHAR_KEY" CHAR(2), \n\t"CHAR_CHAR" CHAR(2 CHAR), \n\t"CHAR_BYTE" CHAR(2), \n\t"VARCHAR2_V" VARCHAR2(2), \n\t"VARCHAR2_CHAR" VARCHAR2(2 CHAR), \n\t"VARCHAR2_BYTE" VARCHAR2(2), \n\t"NCHAR_V" NCHAR(2), \n\t"NCHAR2_V" NVARCHAR2(2), \n\t"NUMBER_V" NUMBER, \n\t"NUMBER3" NUMBER(3,0), \n\t"NUMBER52" NUMBER(5,2), \n\t"FLOAT_V" FLOAT(126), \n\t"FLOAT5" FLOAT(5), \n\t"FLOAT_BINARY" BINARY_FLOAT, \n\t"DOUBLE_BINARY" BINARY_DOUBLE, \n\t"LONG_V" LONG, \n\t"DATE_V" DATE, \n\t"TIMESTAMP_V" TIMESTAMP (6), \n… MAXTRANS 255 \n NOCOMPRESS LOGGING\n  TABLESPACE "USERS" \n LOB ("CLOB_V") STORE AS SECUREFILE (\n  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192\n  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) \n LOB ("NLOB_V") STORE AS SECUREFILE (\n  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192\n  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) \n LOB ("BLOB_V") STORE AS SECUREFILE (\n  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192\n  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) ;')

  const spinner = () => (
    <Dimmer active inverted>
      <Loader size="massive" inverted />
    </Dimmer>
  );
  const content = () => (
    <div className="fill">
      <main className="fill">
        <Switch>
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

Routing.propTypes = {
  access: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  checkLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, event, person }) => ({
  access: profile.access,
  isLoading: profile.isLoading,
  eventSort: event.sort,
  personSort: person.sort,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      checkLoggedIn,
      applyEventSort,
      applyPersonSort,
      searchEvents,
      searchPeople,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
