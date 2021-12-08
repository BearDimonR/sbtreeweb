import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import EventView from '../../components/EventView';
import { loadEvent, loadAction, setActivity, loadNames, editEvent, editActivity, deleteEvent, deleteActivity } from '../EventsPage/actions';
import { loadFullNames } from '../PeoplePage/actions';
import { useParams } from 'react-router-dom';
import EventModal from '../../components/EventModal';
import ActivityModal from '../../components/ActivityModal';

const EventPage = ({user, event, activity, fullNames, eventNames, loadEvent: loadData, loadNames: getNames, 
    loadFullNames: getFullNames, loadAction: getAction, setActivity: updateActivity,
    editEvent, editActivity, deleteEvent, deleteActivity, ...props}) => {
    const {id} = useParams();
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
        deleteEvent(event.id);
    }, [deleteEvent, event]);

    const handleActivityEdit = useCallback((id) => {
        getAction(id);
    }, [getAction])

    const handleActivityDelete = useCallback((id) => {
        deleteActivity(id);
    }, [deleteActivity]);

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

const mapDispatchToProps = dispatch => bindActionCreators({loadEvent, loadAction, setActivity, loadNames, loadFullNames, editEvent, editActivity, deleteEvent, deleteActivity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
