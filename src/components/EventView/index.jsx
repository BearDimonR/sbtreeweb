import React from 'react';
import style from "./index.module.scss";
import _ from 'lodash';
import { Grid, Image, List, Label} from 'semantic-ui-react';
import {Panel} from 'rsuite';



const EventView = ({event, onEdit, onDelete, onActivityEdit, onActivityDelete}) => {

    const getHeader = () => (
        <div className={style.infoTitle}>
            <p>Інформація про подію</p>
            <div className={style.icons}>
                <Label as='a' icon='edit' basic className={style.label} onClick={() => onEdit(event.id)} />
                <Label as='a' icon='delete' basic className={style.label} onClick={() => onDelete(event.id)} />
            </div>
        </div>
    );

    return <div className={style.container}>
        <Image className={style.image} src={event.image} centered></Image>
        <Grid columns={2} stackable className={style.infoGrid}>
            <Grid.Column className={style.infoColumn}>
                <Panel header={getHeader()} shaded bordered>
                    <List divided selection>
                        <List.Item>
                        <Label color='blue' horizontal>
                            Категорія
                        </Label>
                        {event.category}
                        </List.Item>
                        <List.Item>
                        <Label color='green' horizontal>
                            Назва
                        </Label>
                        {event.name}
                        </List.Item>
                        <List.Item>
                        <Label color='purple' horizontal>
                            Дата проведення
                        </Label>
                        {event.start} - {event.end}
                        </List.Item>
                        <List.Item>
                        <Label color='orange' horizontal>
                            Опис
                        </Label>
                        <p>{event.description}</p>
                        </List.Item>
                    </List>
                </Panel>
            </Grid.Column>
            <Grid.Column className={style.infoColumn}>
                <Panel header="Учасники події" bordered prefix='custom-panel'>
                    <List divided selection className={style.activity}>
                        {event.people && _.map(event.people, (val => (
                            <List.Item className={style.content}>
                                <div className={style.actionIcons}>
                                    <Label as='a' icon='edit' basic className={style.label} onClick={() => onActivityEdit(val.activity_id)} />
                                    <Label as='a' icon='delete' basic className={style.label} onClick={() => onActivityDelete(val.activity_id)} />
                                </div>
                                <Image avatar src={val.avatar} />
                                <List.Content>
                                    <List.Header as='a' className={style.activityInfo}>
                                        {val.name}
                                    </List.Header>
                                    <List.Content>{val.role}</List.Content>
                                    <List.Description>
                                        {val.about}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )))}
                    </List>
                </Panel>
            </Grid.Column>
        </Grid>
    </div>;
}

export default EventView;