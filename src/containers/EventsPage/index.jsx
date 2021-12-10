import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import style from "./index.module.scss";
import { Grid } from "semantic-ui-react";
import { loadEvents } from "./actions";
import _ from "lodash";
import EventCard from "../../components/EventCard";
import { Pagination } from "semantic-ui-react";
import { setContentIsLoading } from "../LoginPage/actions";
import {errorHandler} from "../../utils/shared";


const PAGE_SIZE = 12;

const EventsPage = ({
  loadEvents: loadData,
  user,
  events,
  setContentIsLoading,
  ...props
}) => {
  const paginator = useRef(null);
  const [page, setPage] = useState(1);
  const [changed, setChanged] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    setContentIsLoading(true);
    loadData().then(() => setContentIsLoading(false)).catch(errorHandler('Error events loading', () => setContentIsLoading(false)));
  }, [loadData, setContentIsLoading]);

  useEffect(() => {
    setTotalPages(Math.round((events.length + PAGE_SIZE / 2) / PAGE_SIZE));
  }, [setTotalPages, events]);

  useEffect(() => {
    if (changed && paginator.current) {
      paginator.current.scrollIntoView();
      setChanged(false);
    }
  }, [changed, paginator, setChanged]);

  const handlePageChange = useCallback(
    (page, data) => {
      setPage(data.activePage);
      setChanged(true);
    },
    [setPage, setChanged]
  );

  const slice = _.slice(events, PAGE_SIZE * (page - 1), PAGE_SIZE * page);

  return (
    <div className={style.pageWrapper}>
      <Grid className={style.eventsContainer} textAlign="center">
        {_.map(slice, (event) => (
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
              state: { from: props.location },
            }}
          />
        )}
      </Grid>
      {slice.length ? (
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

const mapStateToProps = (rootState) => ({
  user: rootState.profile.user,
  events: rootState.event.list,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadEvents, setContentIsLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
