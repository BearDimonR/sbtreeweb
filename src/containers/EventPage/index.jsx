import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import style from "./index.module.scss";
import EventView from "../../components/EventView";
import {
  loadEvent,
  loadActivity,
  setActivity,
  loadNames,
  editEvent,
  editActivity,
  removeEvent,
  removeActivity,
} from "../EventsPage/actions";
import { loadFullNames } from "../PeoplePage/actions";
import { useParams, useLocation, useHistory } from "react-router-dom";
import EventModal from "../../components/EventModal";
import ActivityModal from "../../components/ActivityModal";
import _ from "lodash";
import { setContentIsLoading } from "../LoginPage/actions";

const EventPage = ({
  user,
  event,
  activity,
  fullNames,
  eventNames,
  loadEvent: loadData,
  loadNames: getNames,
  loadFullNames: getFullNames,
  loadActivity: getActivity,
  setActivity: updateActivity,
  editEvent,
  editActivity,
  removeEvent,
  removeActivity,
  setContentIsLoading,
  ...props
}) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const [editing, setEditing] = useState(false);

  const wrapInSetContentLoading = useCallback(
    (func, after = () => {}) => {
      setContentIsLoading(true);
      func().then(() => {
        after();
        setContentIsLoading(false);
      });
    },
    [setContentIsLoading]
  );

  useEffect(() => {
    wrapInSetContentLoading(() => loadData(id));
  }, [loadData, id, wrapInSetContentLoading]);

  const handleModalClose = useCallback(() => {
    setEditing(false);
    if (activity) {
      updateActivity(null);
    }
  }, [setEditing, updateActivity, activity]);

  const handleEdit = useCallback(() => {
    wrapInSetContentLoading(
      () => loadData(event.id),
      () => setEditing(true)
    );
  }, [setEditing, wrapInSetContentLoading, loadData, event]);

  const handleDelete = useCallback(() => {
    wrapInSetContentLoading(
      () => removeEvent(event.id),
      () => {
        const spl = path.split("/");
        history.push(_.slice(spl, 0, spl.length - 1).join("/"));
      }
    );
  }, [removeEvent, wrapInSetContentLoading, event, history, path]);

  const handleActivityEdit = useCallback(
    (id) => {
      wrapInSetContentLoading(() =>
        Promise.all([getActivity(id), getNames(), getFullNames()])
      );
    },
    [wrapInSetContentLoading, getActivity, getNames, getFullNames]
  );

  const handleActivityDelete = useCallback(
    (id) => {
      wrapInSetContentLoading(() => removeActivity(id));
    },
    [wrapInSetContentLoading, removeActivity]
  );

  const handleSubmit = useCallback(
    (data) => {
      wrapInSetContentLoading(() => editEvent(data));
    },
    [wrapInSetContentLoading, editEvent]
  );

  const handleActivitySubmit = useCallback(
    (data) => {
      wrapInSetContentLoading(() => editActivity(data));
    },
    [wrapInSetContentLoading, editActivity]
  );

  return (
    <div className={style.profileContainer}>
      <EventView
        event={event}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
      />
      <EventModal
        open={editing}
        onClose={handleModalClose}
        user={user}
        event={event}
        onSubmit={handleSubmit}
      />
      <ActivityModal
        open={activity !== null}
        onClose={handleModalClose}
        user={user}
        activity={activity}
        fullNames={fullNames}
        eventNames={eventNames}
        onSubmit={handleActivitySubmit}
      />
    </div>
  );
};
const mapStateToProps = (rootState) => ({
  user: rootState.profile.user,
  event: rootState.event.instance,
  activity: rootState.event.activity,
  fullNames: rootState.person.fullNames,
  eventNames: rootState.event.names,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadEvent,
      loadActivity,
      setActivity,
      loadNames,
      loadFullNames,
      editEvent,
      editActivity,
      removeEvent,
      removeActivity,
      setContentIsLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
