import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";


const PeoplePage = () => {
    return <div className={style.peopleContainer}>
    </div>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);