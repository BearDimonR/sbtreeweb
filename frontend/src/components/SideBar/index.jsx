import React, { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import style from "./index.module.scss";

const CustomSidebar = ({
  pusherComponent: PusherComponent,
  sidebarContent: Content,
  component: Component,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const handleHide = (e) => {
    if (e && e.target.classList[0] === "pusher") {
      setVisible(false);
    }
  };

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        onHide={handleHide}
        vertical
        visible={visible}
        direction="right"
        className={style.sidebar}
      >
        <Content setSidebarVisible={setVisible} />
      </Sidebar>

      <Sidebar.Pusher dimmed={visible} className={style.pusher}>
        <PusherComponent
          setSidebarVisible={setVisible}
          component={Component}
          {...props}
        />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default CustomSidebar;
