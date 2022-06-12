import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";
import EventView from "../../components/EventView";
import {
  loadEvent,
  loadActivity,
  loadNames,
  editEvent,
  editActivity,
  removeEvent,
  removeActivity,
  setActivity,
  loadCategories,
} from "../EventsPage/actions";
import { loadFullNames } from "../PeoplePage/actions";
import { useParams, useLocation, useHistory } from "react-router-dom";
import EventModal from "../../components/EventModal";
import ActivityModal from "../../components/ActivityModal";
import _ from "lodash";

const EventPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const [editing, setEditing] = useState(false);

  const event = useSelector((state) => state.event.instance);
  const activity = useSelector((state) => state.event.activity);
  const fullNames = useSelector((state) => state.person.fullNames);
  const eventNames = useSelector((state) => state.event.names);
  const categories = useSelector((state) => state.event.categories);
  const access = useSelector((state) => state.profile.access);

  useEffect(() => {
    dispatch(loadEvent(id));
  }, [dispatch, id]);

  const handleModalClose = () => {
    setEditing(false);
    if (activity) {
      dispatch(setActivity(null));
    }
  };

  const handleEdit = () => {
    dispatch(loadEvent(event.id));
    dispatch(loadCategories());
    setEditing(true);
  };

  const handleDelete = () => {
    dispatch(removeEvent(event.id));
    const spl = path.split("/");
    history.push(_.slice(spl, 0, spl.length - 1).join("/"));
  };

  const handleActivityEdit = (id) => {
    dispatch(loadActivity(id));
    dispatch(loadNames());
    dispatch(loadFullNames());
  };

  const handleActivityDelete = (id) => {
    dispatch(removeActivity(id));
  };

  const handleSubmit = (data) => {
    dispatch(editEvent(data));
  };

  const handleActivitySubmit = (data) => {
    dispatch(editActivity(data));
  };

  const handleActivityClicked = (id) => {
    history.push(`/people/${id}`);
  };

  return (
    <div className={style.profileContainer}>
      <EventView
        event={event}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
        onActivityClicked={handleActivityClicked}
        access={access}
      />
      <EventModal
        open={editing}
        onClose={handleModalClose}
        event={event}
        categories={categories}
        onSubmit={handleSubmit}
      />
      <ActivityModal
        open={activity !== null}
        onClose={handleModalClose}
        activity={activity}
        fullNames={fullNames}
        eventNames={eventNames}
        onSubmit={handleActivitySubmit}
      />
    </div>
  );
};

export default EventPage;
