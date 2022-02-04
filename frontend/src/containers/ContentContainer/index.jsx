import React, { useCallback, useState } from "react";
import style from "./index.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
import { setContentIsLoading } from "../LoginPage/actions";
import { errorHandler } from "../../utils/shared";

const spinner = () => (
  <Dimmer active inverted>
    <Loader size="massive" inverted />
  </Dimmer>
);

const ContentContainer = ({
  component: Component,
  user,
  sortOptions,
  sort,
  setSort,
  setSidebarVisible,
  contentIsLoading,
  handleSearch,
  setContentIsLoading,
  ...props
}) => {
  const location = useLocation();
  const history = useHistory();
  const [searchVal, setSearchVal] = useState("");
  let path = location.pathname;
  const profilePage = location.pathname === "/profile";

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

  const handleSortChange = useCallback(
    (e, data) => setSort(data.value),
    [setSort]
  );
  const handleSidebarVisible = useCallback(
    () => setSidebarVisible(true),
    [setSidebarVisible]
  );
  const handleSearchChange = useCallback(
    (e) => {
      setContentIsLoading(true);
      handleSearch(e.target.value)
        .then(() => setContentIsLoading(false))
        .catch(
          errorHandler("Error in search handling", () =>
            setContentIsLoading(false)
          )
        );
      setSearchVal(e.target.value);
    },
    [setContentIsLoading, handleSearch]
  );

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
            {sortOptions && (
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
            )}
            {handleSearch && (
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
                value={searchVal}
              />
            )}
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
        </div>
      </div>
      {contentIsLoading && spinner()}
      <Component {...props} />
    </div>
  );
};

const mapStateToProps = (rootState) => ({
  user: rootState.profile.user,
  contentIsLoading: rootState.profile.contentIsLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setContentIsLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);
