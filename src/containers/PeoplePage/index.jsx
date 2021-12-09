import React, { useCallback, useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import style from "./index.module.scss";
import {Grid} from 'semantic-ui-react';
import {loadPeople} from './actions';
import _ from 'lodash';
import PersonCard from '../../components/PersonCard';
import { Pagination, Header } from 'semantic-ui-react'
import {setContentIsLoading} from '../LoginPage/actions';


const PAGE_SIZE = 20;

const PeoplePage = ({loadPeople: loadData, setContentIsLoading, user, people, ...props}) => {
    const paginator = useRef(null);
    const [page, setPage] = useState(1);
    const [changed, setChanged] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [personId, setPersonId] = useState(null);
    
    useEffect(() => {
        setContentIsLoading(true);
        loadData().then(() => setContentIsLoading(false));
    }, [loadData, setContentIsLoading]);

    useEffect(() => {
        setTotalPages(Math.round((people.length + PAGE_SIZE / 2) / PAGE_SIZE))
    }, [setTotalPages, people]);

    useEffect(() => {
        if (changed && paginator.current) {
            paginator.current.scrollIntoView();
            setChanged(false);
        }
    }, [changed, paginator, setChanged]);

    const handlePageChange = useCallback((page, data) => {
        setPage(data.activePage);
        setChanged(true);
    }, [setPage, setChanged]);

    const slice = _.slice(people, PAGE_SIZE * (page - 1), PAGE_SIZE * page);

    return <div className={style.pageWrapper}>
        <Grid className={style.eventsContainer} textAlign="center">
            {_.map(slice, (person) => <Grid.Column mobile={8} tablet={5} computer={4}>
                    <PersonCard key={person.id} user={user} person={person} onClick={setPersonId}/>
                </Grid.Column>
            )}
            {personId && <Redirect to={{pathname: `/people/${personId}`, state: {from: props.location}}}/>}
        </Grid>
        {slice.length ?
            <div className={style.paginator} ref={paginator}>
                <Pagination
                    activePage={page}
                    pointing
                    secondary
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        : ''}
    </div>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user,
    people: rootState.person.list,
});
const mapDispatchToProps = dispatch => bindActionCreators({loadPeople, setContentIsLoading}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);