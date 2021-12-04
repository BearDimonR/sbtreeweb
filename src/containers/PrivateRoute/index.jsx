import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import style from "./index.module.scss";
import ContentContainer from '../ContentContainer';
import Navbar from '../../components/NavBar';
import {logout} from '../LoginPage/actions';

const PrivateRoute = ({component: Component, access, logout: signOut, ...rest}) => {
    return (<Route
        {...rest}
        render={props => (access ? (
                <div className={style.page}>
                    <div className={style.headerContainer}>
                        <Navbar logout={signOut}/>
                    </div>
                    <div className={style.mainContainer}>
                        <ContentContainer component={Component}></ContentContainer>
                    </div>
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

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
