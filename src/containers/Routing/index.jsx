import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotFound from '../../scenes/NotFound';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import PropTypes from 'prop-types';
import {Dimmer, Loader} from "semantic-ui-react";
import LoginPage from '../LoginPage';
import {checkLoggedIn} from '../LoginPage/actions';
import { applySort } from '../EventsPage/actions';
import HomePage from '../HomePage';
import EventsPage from '../EventsPage';
import PeoplePage from '../PeoplePage';
import ProfilePage from '../ProfilePage';
import EventPage from '../EventPage';
import EventFilterWrapper from '../EventFilterWrapper';
import {eventsSortOptions} from '../../utils/sortOptions';

const Routing = ({
                     access,
                     checkLoggedIn: checkLogged,
                     isLoading,
                     eventSort,
                     applySort: setEventSort,
                 }) => {
    useEffect(() => {
        if (!access) {
            checkLogged();
        }
    });

    const spinner = () => (
        <Dimmer active inverted>
            <Loader size="massive" inverted/>
        </Dimmer>
    );
    const content = () => (
        <div className="fill">
            <main className="fill">
                <Switch>
                    <PublicRoute exact path="/login" component={LoginPage}/>
                    <PrivateRoute exact path="/home" component={HomePage}/>
                    <PrivateRoute exact path="/events"
                        sortOptions={eventsSortOptions}
                        sort={eventSort}
                        setSort={setEventSort}
                        filterComponent={EventFilterWrapper}
                        component={EventsPage}
                    />
                    <PrivateRoute exact path="/events/:id" component={EventPage}/>
                    <PrivateRoute exact path="/people" filterComponent={EventFilterWrapper} component={PeoplePage}/>
                    <PrivateRoute exact path="/profile" component={ProfilePage}/>
                    <Route path="*" exact component={NotFound}/>
                </Switch>
            </main>
        </div>
    );

    return (
        isLoading
            ? spinner()
            : content()
    );
};

Routing.propTypes = {
    access: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    checkLoggedIn: PropTypes.func.isRequired
};

const mapStateToProps = ({profile, event}) => ({
    access: profile.access,
    isLoading: profile.isLoading,
    eventSort: event.sort,
});

const mapDispatchToProps = dispatch => bindActionCreators({checkLoggedIn, applySort}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routing);
