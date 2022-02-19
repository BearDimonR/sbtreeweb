import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { Grid } from "semantic-ui-react";
import { loadPeople, setPage } from "./actions";
import _ from "lodash";
import PersonCard from "../../components/PersonCard";
import { Pagination } from "semantic-ui-react";

const PeoplePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.profile.user);
  const people = useSelector((state) => state.person.list);
  const totalPages = useSelector((state) => state.person.totalPages);
  const page = useSelector((state) => state.person.page);
  const paginator = useRef(null);
  const [personId, setPersonId] = useState(null);

  useEffect(() => {
    dispatch(loadPeople());
  }, [dispatch]);

  const handlePageChange = (page, data) => {
    dispatch(setPage(data.activePage));
    dispatch(loadPeople());
  };

  return (
    <div className={style.pageWrapper}>
      <Grid className={style.eventsContainer} textAlign="center">
        {_.map(people, (person) => (
          <Grid.Column mobile={8} tablet={5} computer={4} key={person.id}>
            <PersonCard user={user} person={person} onClick={setPersonId} />
          </Grid.Column>
        ))}
        {personId && (
          <Redirect
            to={{
              pathname: `/people/${personId}`,
              state: { from: location },
            }}
          />
        )}
      </Grid>
      {people.length ? (
        <div className={style.paginator} ref={paginator}>
          <Pagination
            activePage={page}
            pointing
            secondary
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PeoplePage;
