import React, { useCallback, useEffect } from 'react';
import PersonFilter from '../../components/PersonFilter';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { applyFilter, loadStatuses, loadFullNames} from '../PeoplePage/actions';

const EventFilterWrapper = ({applyFilter: apply, loadStatuses: getStatuses, loadFullNames: getNames, filters, statuses, fullNames, ...props}) => {
    useEffect(() => {
        getStatuses();
        getNames();
    }, [getStatuses, getNames]);

    const handleFilter = useCallback((filters) => {
        apply(filters);
    }, [apply]);
    const handleReset = useCallback(() => apply(), [apply]);

    return <PersonFilter filters={filters} statuses={statuses} fullNames={fullNames} apply={handleFilter} reset={handleReset} {...props}/>;
}

const mapStateToProps = rootState => ({
    filters: rootState.person.filters,
    statuses: rootState.person.statuses,
    fullNames: rootState.person.fullNames,
});
const mapDispatchToProps = dispatch => bindActionCreators({applyFilter, loadStatuses, loadFullNames}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterWrapper);