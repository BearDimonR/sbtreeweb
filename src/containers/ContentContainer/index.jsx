import React, { useCallback } from 'react';
import style from "./index.module.scss";
import {connect} from 'react-redux';
import {Image, Breadcrumb, Dropdown} from 'semantic-ui-react';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import _ from 'lodash';

const ContentContainer = ({component: Component, user, sortOptions, sort, setSort, setSidebarVisible, ...props}) => {
    const location = useLocation();
    const history = useHistory();
    let path = location.pathname;
    const profilePage = location.pathname === '/profile';

    const getBreadCrumb = () => {
        const sections = path.split('/').map(item => ({
            key: item,
            content: item.length === 36 ? 'Info' : _.capitalize(item),
            link: true,
            className: item,
            onClick: () => history.push(path.split(item)[0] + item), 
        }));
        delete sections[sections.length - 1].link;
        delete sections[sections.length - 1].onClick;
        return sections;
    };

    const handleSortChange = useCallback((e, data) => setSort(data.value), [setSort]);
    const handleSidebarVisible = useCallback(() => setSidebarVisible(true), [setSidebarVisible]);

    return <div className={style.contentContainer}>
        <div className={style.header}>
            <div className={style.titleContainer}>
                <div className={style.leftContainer}>
                    <Breadcrumb className={`${style.breadcrumb} ${style.title}`} divider='/' sections={getBreadCrumb()} />
                </div>
                <div className={style.rightContainer}>
                    {setSidebarVisible && (
                        <Dropdown text='Filter' multiple icon='filter' onClick={handleSidebarVisible} />
                    )}
                    {sortOptions && (
                        <div className={style.sortWrapper}>
                            <p>
                                Sort
                            </p>
                            <Dropdown
                                    inline
                                    header='Sort by'
                                    value={sort}
                                    options={sortOptions} 
                                    onChange={handleSortChange}
                            />
                        </div>
                    )}
                    {!profilePage && <NavLink to="/profile" className={style.avatarContainer}>
                        <p className={style.userName}>{user.nickname}</p>
                        <Image circular className={style.avatar}
                            src='https://cdn-icons-png.flaticon.com/512/660/660611.png'/>
                    </NavLink>}
                </div>
            </div>
        </div>
        <Component {...props}/>
    </div>
}

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

export default connect(mapStateToProps)(ContentContainer);