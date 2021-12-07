import React from 'react';
import style from "./index.module.scss";
import _ from 'lodash';
import { Grid, Image, List, Label} from 'semantic-ui-react';
import {Panel} from 'rsuite';


const EventView = ({event}) => {
    return <div className={style.container}>
        <Image className={style.image} src={event.image} centered></Image>
        <Grid columns={2} stackable className={style.infoGrid}>
            <Grid.Column>
                <Panel header="Event info" shaded bordered>
                    <List divided selection>
                        <List.Item>
                        <Label color='blue' horizontal>
                            Category
                        </Label>
                        {event.category}
                        </List.Item>
                        <List.Item>
                        <Label color='green' horizontal>
                            Name
                        </Label>
                        {event.name}
                        </List.Item>
                        <List.Item>
                        <Label color='purple' horizontal>
                            Date
                        </Label>
                        {event.start} - {event.end}
                        </List.Item>
                        <List.Item>
                        <Label color='orange' horizontal>
                            Description
                        </Label>
                        <p>{event.description}</p>
                        </List.Item>
                    </List>
                </Panel>
            </Grid.Column>
            <Grid.Column className={style.infoColumn}>
                <Panel header="Activity" bordered>
                <List divided selection className={style.activity}>
                    {event.people && _.map(event.people, (val => (
                        <List.Item>
                            <Image avatar src={val.avatar} />
                            <List.Content>
                                <List.Header as='a'>{val.name}</List.Header>
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