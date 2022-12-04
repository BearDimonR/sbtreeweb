import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { loadEvents, setPage } from "./actions";
import _ from "lodash";
import EventCard from "../../components/EventCard";
import { Grid, Pagination, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add"

const EventsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const events = useSelector((state) => state.event.list);
  const totalPages = useSelector((state) => state.event.totalPages);
  const page = useSelector((state) => state.event.page);
  const paginator = useRef(null);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handlePageChange = (e, value) => {
    dispatch(setPage(value));
    dispatch(loadEvents());
  };

  return (
    <div className={style.pageWrapper}>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        justifyContent="center"
        minHeight="calc(100% - 80px)"
      >
        {_.map(events, (event) => (
          <Grid
            item
            key={event.id}
            className={style.column}
            xs={8}
            sm={4}
            md={4}
            lg={3}
          >
            <EventCard event={event} onClick={setEventId} />
          </Grid>
        ))}
        {eventId && (
          <Redirect
            to={{
              pathname: `/events/${eventId}`,
              state: { from: location },
            }}
          />
        )}
      </Grid>
       <div className={style.paginator}>
        <IconButton aria-label="add" color="primary" style={{marginTop: '20px', margin: "auto"}} onClick={() => setEventId('new')} >
          <Add />
        </IconButton>
      </div>
      {events.length ? (
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

export default EventsPage;
