import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import ProfileView from '../../components/ProfileView'
import {logout} from "../LoginPage/actions";


const ProfilePage = ({updateAvatar, user, logout: signOut}) => {

    const [editModeOn, setEditModeOn] = useState(false);

    const toggleEditMode = () => {
        setEditModeOn(!editModeOn);
    }

    return <div className={style.profileContainer}>
        {!editModeOn &&
        <ProfileView user={user} updateAvatar={updateAvatar} toggleEditMode={toggleEditMode}/>}
    </div>
}
const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
