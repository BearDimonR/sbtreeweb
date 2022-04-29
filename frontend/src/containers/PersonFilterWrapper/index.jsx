import React, { useEffect } from "react";
import _ from "lodash";
import PersonFilter from "../../components/PersonFilter";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, loadStatuses } from "../PeoplePage/actions";
const EventFilterWrapper = (props) => {
  const dispatch = useDispatch();
  const { filters, statuses } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(loadStatuses());
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
    <PersonFilter
      filters={filters}
      statuses={statuses}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

export default EventFilterWrapper;
