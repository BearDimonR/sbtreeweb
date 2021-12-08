import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import ProfileView from '../../components/ProfileView'
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { loadPerson, loadFullNames, editPerson, removePerson, editActivity, removeActivity } from '../PeoplePage/actions';
import { loadActivity, loadNames, setActivity } from '../EventsPage/actions';



const PersonPage = ({
    user, person, loadPerson, loadActivity, setActivity, loadNames, loadFullNames, editPerson, editActivity, removePerson, removeActivity
}) => {
    const {id} = useParams();
    const location = useLocation();
    const history = useHistory();
    const path = location.pathname;
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadPerson(id);
        loadNames();
        loadFullNames();
    }, [loadPerson, loadNames, loadFullNames, id]);

    return <div className={style.profileContainer}>
        <ProfileView user={person} />
    </div>
}
const mapStateToProps = rootState => ({
    user: rootState.profile.user,
    person: rootState.person.instance
});

const mapDispatchToProps = dispatch => bindActionCreators({loadPerson, loadActivity, setActivity, loadNames, loadFullNames, editPerson, editActivity, removePerson, removeActivity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
