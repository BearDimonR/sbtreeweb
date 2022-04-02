import React, { useEffect } from "react";
import PersonFilter from "../../components/PersonFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilter,
  loadStatuses,
  loadFullNames,
} from "../PeoplePage/actions";
const EventFilterWrapper = (props) => {
  const dispatch = useDispatch();
  const { filters, statuses, fullNames } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(loadStatuses());
    dispatch(loadFullNames());
  }, [dispatch]);

  const handleFilter = (filters) => {
    dispatch(applyFilter(filters));
    props.setSidebarVisible(false);
  };
  const handleReset = () => {
    dispatch(applyFilter());
    props.setSidebarVisible(false);
  };

  return (
    <PersonFilter
      filters={filters}
      statuses={statuses}
      fullNames={fullNames}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

export default EventFilterWrapper;
