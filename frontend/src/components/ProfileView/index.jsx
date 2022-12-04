import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import _ from "lodash";
import { Grid, Image, List, Label, Icon } from "semantic-ui-react";
import { Panel } from "rsuite";
import Ratio from "react-ratio";
import { localization } from "../../utils/localization";
import { ROLES } from "../../helpers/constants";
import Add from "@mui/icons-material/Add"
import { IconButton } from "@mui/material";

const ProfileView = ({
  user,
  onEdit,
  onDelete,
  onActivityEdit,
  onActivityDelete,
  onActivityClicked,
  onActivityAdd,
  access,
}) => {
  const ref = useRef();
  const [maxHeight, setMaxHeight] = useState();

  useEffect(() => {
    setMaxHeight(ref.current?.offsetHeight);
  }, [ref.current?.offsetHeight]);

  const getHeader = () => (
    <div className={style.infoTitle}>
      <p>{localization.profile}</p>
      { access >= ROLES.EDITOR &&
      <div className={style.icons}>
        <Label
          as="a"
          icon="edit"
          basic
          className={style.label}
          onClick={() => onEdit(user.id)}
        />
        <Label
          as="a"
          icon="delete"
          basic
          className={style.label}
          onClick={() => onDelete(user.id)}
        />
      </div>
    }
    </div>
  );

  return (
    <Grid className={style.grid} centered>
      <Grid.Row className={style.row}>
        <Grid.Column className={style.avatarColumn}>
          <div style={{ maxWidth: maxHeight }}>
            <Ratio ratio={1} className={style.ratio}>
              <Image
                circular
                className={style.avatar}
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/660/660611.png"
                }
              />
            </Ratio>
          </div>
        </Grid.Column>
        <Grid.Column className={style.column}>
          <Panel
            header={getHeader()}
            shaded
            bordered
            className={style.panel}
            ref={ref}
          >
            <List divided selection>
              <List.Item>
                <Label color="blue" horizontal>
                  {localization.fullName}
                </Label>
                {`${user.surname} ${user.name} ${user.parental}`}
              </List.Item>
              <List.Item>
                <Label color="green" horizontal>
                  {localization.status}
                </Label>
                {user.status}
              </List.Item>
              <List.Item>
                <Label color="purple" horizontal>
                  {localization.membership}
                </Label>
                {user.dateIn}
                {" - "}
                {user.dateOut ?? "Present"}
              </List.Item>
              <List.Item>
                <Label color="violet" horizontal>
                  {localization.contact}
                </Label>
                <Label as="a">
                  <Icon name="mail" />
                  {user.email || "****@***.***"}
                </Label>
                <Label as="a">
                  <Icon name="phone" />
                  {user.telephone || "+38 (***) *** ** **"}
                </Label>
              </List.Item>
              <List.Item>
                <Label color="orange" horizontal>
                  {localization.description}
                </Label>
                {user.about}
              </List.Item>
            </List>
          </Panel>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={style.row}>
        <Panel header={localization.events} bordered prefix="people-custom-panel">
          <List divided selection className={style.activity}>
            {user.events &&
              _.map(user.events, (val) => (
                <List.Item
                  key={val.id}
                  className={style.activityItem}
                  onClick={(e) => onActivityClicked(val.event?.id)}
                >
                 { access >= ROLES.EDITOR &&
                  <div className={style.actionIcons}>
                    <Label
                      as="a"
                      icon="edit"
                      basic
                      className={style.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        onActivityEdit(val.id);
                      }}
                    />
                    <Label
                      as="a"
                      icon="delete"
                      basic
                      className={style.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        onActivityDelete(val.id);
                      }}
                    />
                  </div>
                }
                  <Image avatar src={val.event?.photo} />
                  <List.Content className={style.content}>
                    <List.Header as="a" className={style.activityInfo}>
                      {val.event?.name} {val.event?.dateStart}
                    </List.Header>
                    <List.Content className={style.overflow}>{val.position}</List.Content>
                    <List.Description className={style.overflow}>{val.contribution}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
              <div className={style.add}>
                 <IconButton aria-label="add" color="primary" style={{marginTop: '20px', margin: "auto"}} onClick={onActivityAdd} >
                <Add />
              </IconButton>
              </div>
              
          </List>
        </Panel>
      </Grid.Row>
    </Grid>
  );
};

export default ProfileView;
