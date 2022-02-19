import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventFilter from "../../components/EventFilter";
import { loadCategories, loadNames, applyFilter } from "../EventsPage/actions";

const EventFilterWrapper = (props) => {
  const dispatch = useDispatch();

  const { filters, categories, names } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadNames());
  }, [dispatch]);

  const handleFilter = (filters) => dispatch(applyFilter(filters));
  const handleReset = () => dispatch(applyFilter());

  return (
    <EventFilter
      filters={filters}
      categories={categories}
      names={names}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

export default EventFilterWrapper;
