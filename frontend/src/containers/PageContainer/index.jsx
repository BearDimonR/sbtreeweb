import React from "react";
import style from "./index.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../LoginPage/actions";
import { PAGE_TYPE } from "../../utils/shared";
import EventFilterWrapper from "../EventFilterWrapper";
import PersonFilterWrapper from "../PersonFilterWrapper";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Sidebar from "../../components/SideBar";
import ContentContainer from "../ContentContainer";

const getPageOptions = (path) => {
  switch (path) {
    case PAGE_TYPE.events:
      return {
        filterWrapper: EventFilterWrapper,
      };
    case PAGE_TYPE.people:
      return {
        filterWrapper: PersonFilterWrapper,
      };
    default:
      return {};
  }
};

const PageContainer = ({ component: Component }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const { filterWrapper } = getPageOptions(path);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <div className={style.page}>
      <Navbar logout={handleSignOut} />
      <div className={style.mainContainer}>
        {filterWrapper ? (
          <Sidebar
            sidebarContent={filterWrapper}
            pusherComponent={ContentContainer}
            component={Component}
          />
        ) : (
          <ContentContainer component={Component} />
        )}
      </div>
    </div>
  );
};

export default PageContainer;
