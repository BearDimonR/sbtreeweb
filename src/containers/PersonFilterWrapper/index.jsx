import React, { useCallback, useEffect } from "react";
import PersonFilter from "../../components/PersonFilter";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  applyFilter,
  loadStatuses,
  loadFullNames,
} from "../PeoplePage/actions";
import { setContentIsLoading } from "../LoginPage/actions";
import { errorHandler } from "../../utils/shared";

const EventFilterWrapper = ({
  applyFilter: apply,
  loadStatuses: getStatuses,
  loadFullNames: getNames,
  filters,
  statuses,
  fullNames,
  setContentIsLoading,
  ...props
}) => {
  useEffect(() => {
    setContentIsLoading(true);
    Promise.all([getStatuses(), getNames()]).then(() =>
      setContentIsLoading(false)
    ).catch(errorHandler("Error in loading person filter", () => setContentIsLoading(false)));
  }, [setContentIsLoading, getStatuses, getNames]);

  const handleFilter = useCallback(
    (filters) => {
      setContentIsLoading(true);
      apply(filters).then(() => setContentIsLoading(false)).catch(errorHandler("Error in applying person filter", () => setContentIsLoading(false)));
    },
    [setContentIsLoading, apply]
  );
  const handleReset = useCallback(() => apply(), [apply]);

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

const mapStateToProps = (rootState) => ({
  filters: rootState.person.filters,
  statuses: rootState.person.statuses,
  fullNames: rootState.person.fullNames,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { applyFilter, loadStatuses, loadFullNames, setContentIsLoading },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterWrapper);
