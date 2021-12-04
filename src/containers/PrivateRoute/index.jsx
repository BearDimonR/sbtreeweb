import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import style from "./index.module.scss";
import ContentContainer from '../ContentContainer';

const PrivateRoute = ({component: Component, access, ...rest}) => {
    return (<Route
        {...rest}
        render={props => (access ? (
                <div className={style.mainContainer}>
                    <ContentContainer component={Component}></ContentContainer>
                </div>
                    )
                :
                (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
        )}
    />)
};

PrivateRoute.propTypes = {
    access: PropTypes.number.isRequired,
    component: PropTypes.any.isRequired,
    location: PropTypes.any,
};

PrivateRoute.defaultProps = {
    access: false,
    location: undefined
};

const mapStateToProps = rootState => ({
    access: rootState.profile.access,
});

export default connect(mapStateToProps)(PrivateRoute);
