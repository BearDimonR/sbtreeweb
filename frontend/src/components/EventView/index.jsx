import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import _ from "lodash";
import { Grid, Image, List, Label } from "semantic-ui-react";
import { Panel } from "rsuite";
import Ratio from "react-ratio";
import { localization } from "../../utils/localization";
import { ROLES } from "../../helpers/constants";
import Add from "@mui/icons-material/Add"
import { IconButton } from "@mui/material";

const EventView = ({
  event,
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
      <p>{localization.eventInfo}</p>
      {
          access >= ROLES.EDITOR &&
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
      }
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
                  {localization.name}
                </Label>
                {event.name}
              </List.Item>
              <List.Item>
                <Label color="blue" horizontal>
                  {localization.category}
                </Label>
                {event.category}
              </List.Item>
              <List.Item>
                <Label color="purple" horizontal>
                  {localization.date}
                </Label>
                {event.dateStart} - {event.dateEnd ? event.dateEnd : "Present"}
              </List.Item>
              <List.Item>
                <Label color="orange" horizontal>
                  {localization.description}
                </Label>
                <p>{event.description}</p>
              </List.Item>
            </List>
          </Panel>
        </Grid.Column>
        <Grid.Column className={style.infoColumn}>
          <Panel header={localization.members} bordered prefix="event-custom-panel">
            <List
              divided
              selection
              className={style.activity}
              style={{ maxHeight: (maxHeight || 80) - 80 }}
            >
              {event.people &&
                _.map(event.people, (val) => (
                  <List.Item
                    className={style.item}
                    key={val.id}
                    onClick={() => onActivityClicked(val.person?.id)}
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
                    <Image avatar src={val.person?.avatar} />
                    <List.Content className={style.content}>
                      <List.Header as="a" className={style.activityInfo}>
                        {val.person?.surname} {val.person?.name}
                      </List.Header>
                      <List.Content className={style.overflow}>{val.position}</List.Content>
                      <List.Description className={style.overflow}>{val.contribution}</List.Description>
                    </List.Content>
                  </List.Item>
                ))}
               <IconButton aria-label="add" color="primary" style={{marginTop: '20px', margin: "auto"}} onClick={onActivityAdd} >
                <Add />
              </IconButton>
            </List>
          </Panel>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventView;
