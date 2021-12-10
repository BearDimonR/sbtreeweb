import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
} from "../PeoplePage/actions";
import { loadActivity, loadNames, setActivity } from "../EventsPage/actions";
import _ from "lodash";
import ActivityModal from "../../components/ActivityModal";
import PersonModal from "../../components/PersonModal";
import { setContentIsLoading } from "../LoginPage/actions";
import { errorHandler } from "../../utils/shared";

const PersonPage = ({
  user,
  activity,
  fullNames,
  eventNames,
  loadPerson,
  loadActivity,
  setActivity,
  loadNames,
  loadFullNames,
  editPerson,
  editActivity,
  removePerson,
  removeActivity,
  setContentIsLoading,
}) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const [editing, setEditing] = useState(false);

  const wrapInSetContentLoading = useCallback(
    (msg, func, after = () => {}) => {
      setContentIsLoading(true);
      func()
        .then(() => {
          after();
          setContentIsLoading(false);
        })
        .catch(errorHandler(msg, () => setContentIsLoading(false)));
    },
    [setContentIsLoading]
  );

  useEffect(() => {
    wrapInSetContentLoading("Error in loading person", () => loadPerson(id));
  }, [wrapInSetContentLoading, loadPerson, id]);

  const handleModalClose = useCallback(() => {
    setEditing(false);
    if (activity) {
      setActivity(null);
    }
  }, [setEditing, setActivity, activity]);

  const handleEdit = useCallback(() => {
    wrapInSetContentLoading(
      "Error in editing person",
      () => loadPerson(user.id),
      () => setEditing(true)
    );
  }, [wrapInSetContentLoading, setEditing, loadPerson, user]);

  const handleDelete = useCallback(() => {
    removePerson(user.id);
    wrapInSetContentLoading(
      "Error in removing person",
      () => removePerson(user.id),
      () => {
        const spl = path.split("/");
        history.push(_.slice(spl, 0, spl.length - 1).join("/"));
      }
    );
  }, [wrapInSetContentLoading, removePerson, user, history, path]);

  const handleActivityEdit = useCallback(
    (id) => {
      wrapInSetContentLoading("Error in editing activity", () =>
        Promise.all([loadActivity(id), loadNames(), loadFullNames()])
      );
    },
    [wrapInSetContentLoading, loadNames, loadFullNames, loadActivity]
  );

  const handleActivityDelete = useCallback(
    (id) => {
      wrapInSetContentLoading("Error in activity delete", () =>
        removeActivity(id)
      );
    },
    [wrapInSetContentLoading, removeActivity]
  );

  const handleSubmit = useCallback(
    (data) => {
      wrapInSetContentLoading("Error in submit person edit", () =>
        editPerson(data)
      );
    },
    [wrapInSetContentLoading, editPerson]
  );

  const handleActivitySubmit = useCallback(
    (data) => {
      wrapInSetContentLoading("Error in submit activity edit", () =>
        editActivity(data)
      );
    },
    [wrapInSetContentLoading, editActivity]
  );

  return (
    <div className={style.profileContainer}>
      <ProfileView
        user={user}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onActivityEdit={handleActivityEdit}
        onActivityDelete={handleActivityDelete}
      />
      <PersonModal
        open={editing}
        onClose={handleModalClose}
        user={user}
        person={user}
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
  activity: rootState.event.activity,
  fullNames: rootState.person.fullNames,
  eventNames: rootState.event.names,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPerson,
      loadActivity,
      setActivity,
      loadNames,
      loadFullNames,
      editPerson,
      editActivity,
      removePerson,
      removeActivity,
      setContentIsLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
