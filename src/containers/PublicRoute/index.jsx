import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PublicRoute = ({component: Component, access, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (access) {
                return (<Redirect to={{pathname: '/home', state: {from: props.location}}}/>)
            }
            return (<Component {...props} />)
        }
        }
    />
);

PublicRoute.propTypes = {
    access: PropTypes.number.isRequired,
    component: PropTypes.any.isRequired,
    location: PropTypes.any
};

PublicRoute.defaultProps = {
    location: undefined
};

const mapStateToProps = rootState => ({
    access: rootState.profile.access,
});

export default connect(mapStateToProps)(PublicRoute);
