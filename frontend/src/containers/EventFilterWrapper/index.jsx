import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventFilter from "../../components/EventFilter";
import { loadCategories, applyFilter } from "../EventsPage/actions";

const EventFilterWrapper = (props) => {
  const dispatch = useDispatch();

  const { filters, categories } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleFilter = (filters) => {
    const filteredValue = _.pickBy(
      filters,
      (value) => value && !_.isEmpty(value)
    );
    dispatch(applyFilter(filteredValue));
    props.setSidebarVisible(false);
  };
  const handleReset = () => {
    dispatch(applyFilter());
    props.setSidebarVisible(false);
  };

  return (
    <EventFilter
      filters={filters}
      categories={categories}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

export default EventFilterWrapper;
