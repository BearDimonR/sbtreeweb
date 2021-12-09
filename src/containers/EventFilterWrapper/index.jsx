import React, { useCallback, useEffect } from "react";
import EventFilter from "../../components/EventFilter";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { applyFilter, loadCategories, loadNames } from "../EventsPage/actions";
import { setContentIsLoading } from "../LoginPage/actions";

const EventFilterWrapper = ({
  applyFilter: apply,
  loadCategories: getCategories,
  loadNames: getNames,
  setContentIsLoading,
  filters,
  names,
  categories,
  contentIsLoading,
  ...props
}) => {
  useEffect(() => {
    setContentIsLoading(true);
    Promise.all([getCategories(), getNames()]).then(() =>
      setContentIsLoading(false)
    );
  }, [setContentIsLoading, getCategories, getNames]);

  const handleFilter = useCallback(
    (filters) => {
      setContentIsLoading(true);
      apply(filters).then(() => setContentIsLoading(false));
    },
    [setContentIsLoading, apply]
  );

  const handleReset = useCallback(() => handleFilter(), [handleFilter]);
  console.log(contentIsLoading);
  return (
    <EventFilter
      filters={filters}
      categories={categories}
      names={names}
      contentIsLoading={contentIsLoading}
      apply={handleFilter}
      reset={handleReset}
      {...props}
    />
  );
};

const mapStateToProps = (rootState) => ({
  filters: rootState.event.filters,
  categories: rootState.event.categories,
  names: rootState.event.names,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { applyFilter, loadCategories, loadNames, setContentIsLoading },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterWrapper);
