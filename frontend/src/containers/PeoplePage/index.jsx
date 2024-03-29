import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { loadPeople, setPage } from "./actions";
import _ from "lodash";
import PersonCard from "../../components/PersonCard";
import Add from "@mui/icons-material/Add";
import { ROLES } from "../../helpers/constants";
import { Grid, IconButton, Pagination } from "@mui/material";

const PeoplePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const people = useSelector((state) => state.person.list);
  const totalPages = useSelector((state) => state.person.totalPages);
  const page = useSelector((state) => state.person.page);
  const paginator = useRef(null);
  const [personId, setPersonId] = useState(null);
  const access = useSelector((state) => state.profile.access);

  useEffect(() => {
    dispatch(loadPeople());
  }, [dispatch]);

  const handlePageChange = (e, value) => {
    dispatch(setPage(value));
    dispatch(loadPeople());
  };

  return (
    <div className={style.pageWrapper}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 12, sm: 8, md: 9, lg: 8 }}
        justifyContent="center"
        minHeight="calc(100% - 80px)"
      >
        {_.map(people, (person) => (
          <Grid
            item
            key={person.id}
            className={style.column}
            xs={12}
            sm={4}
            md={3}
            lg={2}
          >
            <PersonCard person={person} onClick={setPersonId} />
          </Grid>
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
      {access >= ROLES.EDITOR && (
        <div className={style.paginator}>
          <IconButton
            aria-label="add"
            color="primary"
            style={{ marginTop: "20px", margin: "auto" }}
            onClick={() => setPersonId("new")}
          >
            <Add />
          </IconButton>
        </div>
      )}
      {people.length ? (
        <div className={style.paginator} ref={paginator}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PeoplePage;
