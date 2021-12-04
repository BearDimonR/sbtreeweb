import React from 'react';
import style from "./index.module.scss";
import {useLocation} from 'react-router-dom';

const ContentContainer = ({component: Component}) => {
    const location = useLocation();
    let path = location.pathname;

    const getTitle = () => {
        switch (path) {
            case '/profile':
                return 'Your profile';
            case '/events':
                return 'Events';
            case '/people':
                return 'People';
            case '/':
                return 'Home page';
            default:
                return '';
        }
    }

    return <div className={style.contentContainer}>
        <div className={style.header}>
            <div className={style.titleContainer}>
                <p className={style.title}>{getTitle()}</p>
            </div>
        </div>
        <Component/>
    </div>
}

export default ContentContainer;