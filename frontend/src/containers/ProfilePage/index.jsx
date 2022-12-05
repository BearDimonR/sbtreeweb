import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";
import ProfileView from "../../components/ProfileView";
import { useLocation, useHistory } from "react-router-dom";
import {
  loadPerson,
  loadFullNames,
  editPerson,
  removePerson,
  editActivity,
  removeActivity,
  loadSpecialties,
} from "../PeoplePage/actions";
import { loadActivity, loadNames, setActivity } from "../EventsPage/actions";
import _ from "lodash";
import ActivityModal from "../../components/ActivityModal";
import PersonModal from "../../components/PersonModal";

const PersonPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;

  const user = useSelector((state) => state.profile.user);
  const person = useSelector((state) => state.person.instance);
  const activity = useSelector((state) => state.event.activity);
  const fullNames = useSelector((state) => state.person.fullNames);
  const eventNames = useSelector((state) => state.event.names);
  const specialties = useSelector((state) => state.person.specialties);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(loadPerson(user.personId));
  }, [dispatch, user.personId]);

  const handleModalClose = () => {
    setEditing(false);
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
    dispatch(loadActivity(id));
    dispatch(loadNames());
    dispatch(loadFullNames());
  };

  const handleActivityDelete = (id) => {
    dispatch(removeActivity(id));
  };

  const handleSubmit = (data) => {
    dispatch(editPerson(data));
  };

  const handleActivitySubmit = (data) => {
    dispatch(editActivity(data));
  };

  return (
    <div className={style.profileContainer}>
      <ProfileView
        user={person}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
      />
      <PersonModal
        open={editing}
        onClose={handleModalClose}
        person={person}
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
