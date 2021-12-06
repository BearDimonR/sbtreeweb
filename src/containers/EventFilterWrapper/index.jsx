import React, { useCallback, useEffect } from 'react';
import EventFilter from '../../components/EventFilter';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { applyFilter, loadCategories, loadNames} from '../EventsPage/actions';

const EventFilterWrapper = ({applyFilter: apply, loadCategories: getCategories, loadNames: getNames, filters, names, categories, ...props}) => {
    useEffect(() => {
        getCategories();
        getNames();
    }, [getCategories, getNames]);

    const handleFilter = useCallback((filters) => {
        apply(filters);
    }, [apply]);
    const handleReset = useCallback(() => apply(), [apply]);

    return <EventFilter filters={filters} categories={categories} names={names} apply={handleFilter} reset={handleReset} {...props}/>;
}

const mapStateToProps = rootState => ({
    filters: rootState.event.filters,
    categories: rootState.event.categories,
    names: rootState.event.names,
});
const mapDispatchToProps = dispatch => bindActionCreators({applyFilter, loadCategories, loadNames}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterWrapper);