import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import EventView from '../../components/EventView';
import { loadEvent } from '../EventsPage/actions';
import { useParams } from 'react-router-dom';


const EventPage = ({event, loadEvent: loadData, ...props}) => {
    const {id} = useParams();
    const [editModeOn, setEditModeOn] = useState(false);

    useEffect(() => {
        if (_.isEmpty(event)) {
            loadData(id);
        }
    }, [loadData, event, id]);

    const toggleEditMode = () => {
        setEditModeOn(!editModeOn);
    }

    return <div className={style.profileContainer}>
        {!editModeOn &&
        <EventView event={event} toggleEditMode={toggleEditMode}/>}
    </div>
}
const mapStateToProps = rootState => ({
    event: rootState.event.instance
});

const mapDispatchToProps = dispatch => bindActionCreators({loadEvent}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
