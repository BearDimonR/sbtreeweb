import React from "react";
import _ from "lodash";
import PersonFilter from "../../components/PersonFilter";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "../PeoplePage/actions";
import { STATUSES } from "../../helpers/constants";
const EventFilterWrapper = (props) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.person);

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
      statuses={STATUSES}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

export default EventFilterWrapper;
