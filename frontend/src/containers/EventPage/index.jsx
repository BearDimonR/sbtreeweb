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
  createEvent,
  createActivity,
} from "../EventsPage/actions";
import { loadFullNames } from "../PeoplePage/actions";
import { useParams, useLocation, useHistory } from "react-router-dom";
import EventModal from "../../components/EventModal";
import ActivityModal from "../../components/ActivityModal";
import _ from "lodash";
import { NEW } from "../../helpers/constants";

const EventPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { id } = useParams();
  const isNew = id === NEW;
  const path = location.pathname;

  const [editing, setEditing] = useState(isNew);

  const event = useSelector((state) => state.event.instance);
  const activity = useSelector((state) => state.event.activity);
  const fullNames = useSelector((state) => state.person.fullNames);
  const eventNames = useSelector((state) => state.event.names);
  const categories = useSelector((state) => state.event.categories);
  const access = useSelector((state) => state.profile.access);

  useEffect(() => {
    if (!isNew) {
      dispatch(loadEvent(id));
    } else {
      dispatch(loadCategories());
    }
  }, [dispatch, id, isNew]);

  const handleModalClose = () => {
    setEditing(false);
    if (activity) {
      dispatch(setActivity(null));
    }
    if (isNew) {
      history.push(`/events`);
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
    if (id !== NEW) {
      dispatch(loadActivity(id));
    } else {
      dispatch(setActivity({ id: NEW, eventId: event.id }));
    }
    dispatch(loadNames());
    dispatch(loadFullNames());
  };

  const handleActivityDelete = (id) => {
    dispatch(removeActivity(id));
  };

  const handleSubmit = (data) => {
    if (isNew) {
      dispatch(createEvent(_.omit(data, ["id"])));
    } else {
      dispatch(editEvent(data));
    }
  };

  const handleActivitySubmit = (data) => {
    if (data.id === NEW) {
      dispatch(createActivity(_.omit(data, ["id"])));
    } else {
      dispatch(editActivity(data));
    }
  };

  const handleActivityClicked = (id) => history.push(`/people/${id}`);
  const handleActivityAdd = () => handleActivityEdit(NEW);

  const displayEvent = isNew ? {} : event;

  return (
    <div className={style.profileContainer}>
      <EventView
        event={displayEvent}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
        onActivityClicked={handleActivityClicked}
        onActivityAdd={handleActivityAdd}
        access={access}
      />
      <EventModal
        open={editing}
        onClose={handleModalClose}
        event={displayEvent}
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
