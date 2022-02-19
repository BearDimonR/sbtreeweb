import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { Grid } from "semantic-ui-react";
import { loadEvents, setPage } from "./actions";
import _ from "lodash";
import EventCard from "../../components/EventCard";
import { Pagination } from "semantic-ui-react";

const EventsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.profile.user);
  const events = useSelector((state) => state.event.list);
  const totalPages = useSelector((state) => state.event.totalPages);
  const page = useSelector((state) => state.event.page);
  const paginator = useRef(null);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handlePageChange = (page, data) => {
    dispatch(setPage(data.activePage));
    dispatch(loadEvents());
  };

  return (
    <div className={style.pageWrapper}>
      <Grid className={style.eventsContainer} textAlign="center">
        {_.map(events, (event) => (
          <Grid.Column
            key={event.id}
            mobile={16}
            tablet={8}
            computer={5}
            className={style.column}
          >
            <EventCard user={user} event={event} onClick={setEventId} />
          </Grid.Column>
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
      {events.length ? (
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

export default EventsPage;
