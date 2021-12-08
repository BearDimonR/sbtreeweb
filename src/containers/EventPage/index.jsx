import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import EventView from '../../components/EventView';
import { loadEvent, loadActivity, setActivity, loadNames, editEvent, editActivity, removeEvent, removeActivity } from '../EventsPage/actions';
import { loadFullNames } from '../PeoplePage/actions';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import EventModal from '../../components/EventModal';
import ActivityModal from '../../components/ActivityModal';
import _ from 'lodash';

const EventPage = ({user, event, activity, fullNames, eventNames, loadEvent: loadData, loadNames: getNames, 
    loadFullNames: getFullNames, loadActivity: getActivity, setActivity: updateActivity,
    editEvent, editActivity, removeEvent, removeActivity, ...props}) => {
    const {id} = useParams();
    const location = useLocation();
    const history = useHistory();
    const path = location.pathname;
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadData(id);
        getNames();
        getFullNames();
    }, [loadData, getNames, getFullNames, id]);

    const handleModalClose = useCallback(() => {
        setEditing(false);
        if (activity) {
            updateActivity(null);
        }
    }, [setEditing, updateActivity, activity]);

    const handleEdit = useCallback(() => {
        loadData(event.id);
        setEditing(true);
    }, [setEditing, loadData, event]);

    const handleDelete = useCallback(() => {
        removeEvent(event.id);
        const spl = path.split('/');
        history.push(_.slice(spl, 0, spl.length - 1).join('/'));
    }, [removeEvent, event, history, path]);

    const handleActivityEdit = useCallback((id) => {
        getActivity(id);
    }, [getActivity])

    const handleActivityDelete = useCallback((id) => {
        removeActivity(id);
    }, [removeActivity]);

    const handleSubmit = useCallback((data) => {
        editEvent(data);
    }, [editEvent]);

    const handleActivitySubmit = useCallback((data) => {
        editActivity(data);
    }, [editActivity]);

    return <div className={style.profileContainer}>
        <EventView event={event} onEdit={handleEdit} onDelete={handleDelete} onActivityEdit={handleActivityEdit} onActivityDelete={handleActivityDelete} />
        <EventModal open={editing} onClose={handleModalClose} user={user} event={event} onSubmit={handleSubmit}></EventModal>
        <ActivityModal open={activity !== null} onClose={handleModalClose} user={user} activity={activity} fullNames={fullNames} eventNames={eventNames} onSubmit={handleActivitySubmit}></ActivityModal>
    </div>
}
const mapStateToProps = rootState => ({
    user: rootState.profile.user,
    event: rootState.event.instance,
    activity: rootState.event.activity,
    fullNames: rootState.person.fullNames,
    eventNames: rootState.event.names,
});

const mapDispatchToProps = dispatch => bindActionCreators({loadEvent, loadActivity, setActivity, loadNames, loadFullNames, editEvent, editActivity, removeEvent, removeActivity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
