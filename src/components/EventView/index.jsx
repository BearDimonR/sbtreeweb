import React from 'react';
import style from "./index.module.scss";
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
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Header as='a'>Name</List.Header>
                            <List.Content>Top Manager</List.Content>
                            <List.Description>
                                Helps to organize all, do a lot of things
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                </Panel>
            </Grid.Column>
        </Grid>
    </div>;
}

export default EventView;