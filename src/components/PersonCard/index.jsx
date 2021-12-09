import React from 'react'
import style from "./index.module.scss";
import { Card, Label, Image} from 'semantic-ui-react'
import moment from 'moment';

const PersonCard = ({user, person, onClick}) => (
    <Card onClick={() => onClick(person.id)} className={style.card}>
        <Image src={person.avatar || 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'} wrapped ui={false} />
        <Card.Content>
        <Card.Header>
            {person.surname} {person.name}
        </Card.Header>
        <Card.Meta>{moment(person.start).format('ll')} - {person.end ? moment(person.end).format('ll') : 'Present'}</Card.Meta>
        <Card.Description>
            {person.about ? person.about.split('.')[0] : ''}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Label className={style.label}>
            {person.status}
        </Label>
        </Card.Content>
    </Card>
)

export default PersonCard