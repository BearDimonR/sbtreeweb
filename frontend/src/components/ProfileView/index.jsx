import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import _ from "lodash";
import { Grid, Image, List, Label, Icon } from "semantic-ui-react";
import { Panel } from "rsuite";
import Ratio from "react-ratio";

const ProfileView = ({
  user,
  onEdit,
  onDelete,
  onActivityEdit,
  onActivityDelete,
  onActivityClicked,
}) => {
  const ref = useRef();
  const [maxHeight, setMaxHeight] = useState();

  useEffect(() => {
    setMaxHeight(ref.current?.offsetHeight);
  }, [ref.current?.offsetHeight]);

  const getHeader = () => (
    <div className={style.infoTitle}>
      <p>Профіль</p>
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
                  ПІБ
                </Label>
                {`${user.surname} ${user.name} ${user.parental}`}
              </List.Item>
              <List.Item>
                <Label color="green" horizontal>
                  Статус
                </Label>
                {user.status}
              </List.Item>
              <List.Item>
                <Label color="purple" horizontal>
                  Членство
                </Label>
                {user.dateIn}
                {" - "}
                {user.dateOut ?? "Present"}
              </List.Item>
              <List.Item>
                <Label color="violet" horizontal>
                  Контакти
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
                  Опис
                </Label>
                {user.about}
              </List.Item>
            </List>
          </Panel>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={style.row}>
        <Panel header="Події" bordered prefix="people-custom-panel">
          <List divided selection className={style.activity}>
            {user.events &&
              _.map(user.events, (val) => (
                <List.Item
                  key={val.id}
                  className={style.activityItem}
                  onClick={() => onActivityClicked(val.event?.id)}
                >
                  <div className={style.actionIcons}>
                    <Label
                      as="a"
                      icon="edit"
                      basic
                      className={style.label}
                      onClick={() => onActivityEdit(val.id)}
                    />
                    <Label
                      as="a"
                      icon="delete"
                      basic
                      className={style.label}
                      onClick={() => onActivityDelete(val.id)}
                    />
                  </div>
                  <Image avatar src={val.event?.photo} />
                  <List.Content>
                    <List.Header as="a" className={style.activityInfo}>
                      {val.event?.name}
                    </List.Header>
                    <List.Content>{val.position}</List.Content>
                    <List.Description>{val.contribution}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Panel>
      </Grid.Row>
    </Grid>
  );
};

export default ProfileView;
