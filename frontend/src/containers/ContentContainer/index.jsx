import React from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Dropdown,
  Dimmer,
  Loader,
  Search,
  Input,
} from "semantic-ui-react";
import { NavLink, useLocation } from "react-router-dom";
import _ from "lodash";
import { setSort, applySearch } from "./actions";
import { localization } from "../../utils/localization";
import {
  EVENTS_SORT_OPTIONS,
  PAGE_TYPE,
  PEOPLE_SORT_OPTIONS,
} from "../../helpers/constants";

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

const headerRequired = (path) => {
  return [PAGE_TYPE.events, PAGE_TYPE.people].includes(path);
};

const ContentContainer = ({ component: Component, setSidebarVisible }) => {
  const dispatch = useDispatch();
  const location = useLocation();
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

  return (
    <div className={style.contentContainer}>
      {headerRequired(path) && (
        <div className={style.header}>
          <div className={style.titleContainer}>
            {sortOptions && (
              <div className={style.rightContainer}>
                {setSidebarVisible && (
                  <Dropdown
                    text={localization.filter}
                    className={style.filterWrapper}
                    multiple
                    icon="filter"
                    onClick={handleSidebarVisible}
                  />
                )}
                <div className={style.sortWrapper}>
                  <p>{localization.sortBy}</p>
                  <Dropdown
                    inline
                    header={localization.sortBy}
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
                {!profilePage && user && (
                  <NavLink to="/profile" className={style.avatarContainer}>
                    <Image
                      circular
                      className={style.avatar}
                      src={
                        user.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/660/660611.png"
                      }
                    />
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {isLoading && spinner()}
      <Component />
    </div>
  );
};

export default ContentContainer;
