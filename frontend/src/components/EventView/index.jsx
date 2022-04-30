import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import _ from "lodash";
import { Grid, Image, List, Label } from "semantic-ui-react";
import { Panel } from "rsuite";
import Ratio from "react-ratio";

const EventView = ({
  event,
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
      <p>Інформація про подію</p>
      <div className={style.icons}>
        <Label
          as="a"
          icon="edit"
          basic
          className={style.label}
          onClick={(e) => onEdit(event.id)}
        />
        <Label
          as="a"
          icon="delete"
          basic
          className={style.label}
          onClick={(e) => onDelete(event.id)}
        />
      </div>
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.ratio}>
        <Ratio ratio={16 / 9} className={style.ratio}>
          <img src={event.photo} alt={event.name} className={style.photo} />
        </Ratio>
      </div>
      <Grid columns={2} stackable className={style.infoGrid}>
        <Grid.Column className={style.infoColumn}>
          <Panel header={getHeader()} shaded bordered ref={ref}>
            <List divided selection>
              <List.Item>
                <Label color="green" horizontal>
                  Назва
                </Label>
                {event.name}
              </List.Item>
              <List.Item>
                <Label color="blue" horizontal>
                  Категорія
                </Label>
                {event.category}
              </List.Item>
              <List.Item>
                <Label color="purple" horizontal>
                  Дата проведення
                </Label>
                {event.dateStart} - {event.dateEnd}
              </List.Item>
              <List.Item>
                <Label color="orange" horizontal>
                  Опис
                </Label>
                <p>{event.description}</p>
              </List.Item>
            </List>
          </Panel>
        </Grid.Column>
        <Grid.Column className={style.infoColumn}>
          <Panel header="Учасники події" bordered prefix="event-custom-panel">
            <List
              divided
              selection
              className={style.activity}
              style={{ maxHeight: (maxHeight || 80) - 80 }}
            >
              {event.people &&
                _.map(event.people, (val) => (
                  <List.Item
                    className={style.content}
                    key={val.id}
                    onClick={() => onActivityClicked(val.person?.id)}
                  >
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
                    <Image avatar src={val.person?.avatar} />
                    <List.Content>
                      <List.Header as="a" className={style.activityInfo}>
                        {val.person?.surname} {val.person?.name}
                      </List.Header>
                      <List.Content>{val.position}</List.Content>
                      <List.Description>{val.contribution}</List.Description>
                    </List.Content>
                  </List.Item>
                ))}
            </List>
          </Panel>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventView;
