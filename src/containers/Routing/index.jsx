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

const Routing = ({
                     access,
                     checkLoggedIn: checkLogged,
                     isLoading
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
                    <PrivateRoute exact path="/" component={() => <div></div>}/>
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

const mapStateToProps = ({profile}) => ({
    access: profile.access,
    isLoading: profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({checkLoggedIn}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routing);
