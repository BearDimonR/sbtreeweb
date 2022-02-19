import React from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Breadcrumb,
  Dropdown,
  Dimmer,
  Loader,
  Search,
  Input,
} from "semantic-ui-react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import { setSort, applySearch } from "./actions";
import {
  PAGE_TYPE,
  EVENTS_SORT_OPTIONS,
  PEOPLE_SORT_OPTIONS,
} from "../../utils/shared";

const getPageOptions = (path) => {
  switch (path) {
    case PAGE_TYPE.events:
      return {
        sortSelector: (state) => state.event.sort,
        sortOptions: EVENTS_SORT_OPTIONS,
      };
    case PAGE_TYPE.people:
      return {
        sortSelector: (state) => state.person.sort,
        sortOptions: PEOPLE_SORT_OPTIONS,
      };
    default:
      return { sortSelector: (state) => state.person.sort };
  }
};

const spinner = () => (
  <Dimmer active inverted>
    <Loader size="massive" inverted />
  </Dimmer>
);

const ContentContainer = ({ component: Component, setSidebarVisible }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const profilePage = path === "/profile";
  const { sortSelector, sortOptions } = getPageOptions(path);
  const user = useSelector((state) => state.profile.user);
  const isLoading = !_.isEmpty(
    useSelector((state) => state.profile.contentIsLoading)
  );
  const search = useSelector((state) => state.profile.search);
  const sort = useSelector(sortSelector);
  const handleSortChange = (e, data) => {
    dispatch(setSort(path, data.value));
  };
  const handleSidebarVisible = () => setSidebarVisible(true);
  const handleSearchChange = (e) => {
    dispatch(applySearch(path, e.target.value));
  };

  const getBreadCrumb = () => {
    const sections = path.split("/").map((item) => ({
      key: item,
      content: item.length === 36 ? "Info" : _.capitalize(item),
      link: true,
      className: item,
      onClick: () => history.push(path.split(item)[0] + item),
    }));
    delete sections[sections.length - 1].link;
    delete sections[sections.length - 1].onClick;
    return sections;
  };

  return (
    <div className={style.contentContainer}>
      <div className={style.header}>
        <div className={style.titleContainer}>
          <div className={style.leftContainer}>
            <Breadcrumb
              className={`${style.breadcrumb} ${style.title}`}
              divider="/"
              sections={getBreadCrumb()}
            />
          </div>
          {sortOptions && (
            <div className={style.rightContainer}>
              {setSidebarVisible && (
                <Dropdown
                  text="Filter"
                  className={style.filterWrapper}
                  multiple
                  icon="filter"
                  onClick={handleSidebarVisible}
                />
              )}
              <div className={style.sortWrapper}>
                <p>Sort</p>
                <Dropdown
                  inline
                  header="Sort by"
                  value={sort}
                  options={sortOptions}
                  onChange={handleSortChange}
                />
              </div>
              <Search
                className={style.search}
                input={() => (
                  <Input
                    icon="search"
                    iconPosition="left"
                    className={style.searchInput}
                  />
                )}
                onChange={handleSearchChange}
                value={search}
              />
              {!profilePage && (
                <NavLink to="/profile" className={style.avatarContainer}>
                  <p className={style.userName}>{user.username}</p>
                  <Image
                    circular
                    className={style.avatar}
                    src="https://cdn-icons-png.flaticon.com/512/660/660611.png"
                  />
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
      {isLoading && spinner()}
      <Component />
    </div>
  );
};

export default ContentContainer;
