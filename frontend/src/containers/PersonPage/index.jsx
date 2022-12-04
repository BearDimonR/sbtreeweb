import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";
import ProfileView from "../../components/ProfileView";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  loadPerson,
  loadFullNames,
  editPerson,
  removePerson,
  editActivity,
  removeActivity,
  loadSpecialties,
  createPerson,
  createActivity,
} from "../PeoplePage/actions";
import { loadActivity, loadNames, setActivity } from "../EventsPage/actions";
import _ from "lodash";
import ActivityModal from "../../components/ActivityModal";
import PersonModal from "../../components/PersonModal";
import { NEW } from "../../helpers/constants";

const PersonPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { id } = useParams();
  const isNew = id === NEW;
  const path = location.pathname;

  const [editing, setEditing] = useState(isNew);

  const person = useSelector((state) => state.person.instance);
  const activity = useSelector((state) => state.event.activity);
  const fullNames = useSelector((state) => state.person.fullNames);
  const specialties = useSelector((state) => state.person.specialties);
  const eventNames = useSelector((state) => state.event.names);
  const access = useSelector((state) => state.profile.access);

  useEffect(() => {
    if (!isNew) {
      dispatch(loadPerson(id));
    } else {
      dispatch(loadSpecialties());
      dispatch(loadFullNames());
    }
  }, [dispatch, id, isNew]);

  const handleModalClose = () => {
    setEditing(false);
    if (isNew) {
      history.push(`/people`);
    }
    if (activity) {
      dispatch(setActivity(null));
    }
  };

  const handleEdit = () => {
    dispatch(loadPerson(person.id));
    dispatch(loadSpecialties());
    dispatch(loadFullNames());
    setEditing(true);
  };

  const handleDelete = () => {
    dispatch(removePerson(person.id));
    const spl = path.split("/");
    history.push(_.slice(spl, 0, spl.length - 1).join("/"));
  };

  const handleActivityEdit = (id) => {
     if (id !== NEW) {
      dispatch(loadActivity(id));
    } else {
      dispatch(setActivity({id: NEW, personId: person.id}))
    }
    dispatch(loadNames());
    dispatch(loadFullNames());
  };

  const handleActivityDelete = (id) => {
    dispatch(removeActivity(id));
  };

  const handleSubmit = (data) => {
    if (isNew) {
      dispatch(createPerson(_.omit(data, ['id'])));
    } else {
      dispatch(editPerson(data));
    }
  };

  const handleActivitySubmit = (data) => {
    if (data.id === NEW) {
      dispatch(createActivity(_.omit(data, ['id'])))
    } else {
      dispatch(editActivity(data));
    }
  };

  const handleActivityClicked = (id) => history.push(`/events/${id}`);
  const handleActivityAdd = () => handleActivityEdit(NEW); 

  const displayPerson = isNew ? {} : person;

  return (
    <div className={style.profileContainer}>
      <ProfileView
        user={displayPerson}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
        onActivityClicked={handleActivityClicked}
        onActivityAdd={handleActivityAdd}
        access={access}
      />
      <PersonModal
        open={editing}
        onClose={handleModalClose}
        person={displayPerson}
        fullNames={fullNames}
        specialties={specialties}
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
export default PersonPage;
