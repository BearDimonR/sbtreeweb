import React, { useEffect } from 'react';
import _ from 'lodash';
import { Modal, Form, ButtonToolbar, Button, SelectPicker, Schema, Input } from 'rsuite';

const { StringType } = Schema.Types;

const model = Schema.Model({
  person: StringType().isRequired('This field is required.'),
  event: StringType().isRequired('This field is required.'),
  description: StringType().isRequired('This field is required.').minLength(10, 'Write more.').maxLength(500, 'Max length 500.'),
  role: StringType().isRequired('This field is required'),
});

const getInitial = (activity) => {
    const person = activity?.person;
    const event = activity?.event;
    return {
        person: person ? `${person.surname} ${person.name}` : '',
        event: event ? event.name : '',
        role: activity?.role || '',
        description: activity?.about || '',
    }
};

const getInput = (props) => <Input as="textarea" {...props} style={{height: '120px'}} />;
const getSelect = (props) => <SelectPicker {...props} style={{width: '100%'}} />

const ActivityModal = ({open, user, activity={}, fullNames, eventNames, onClose, onSubmit}) => {
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({});
    const [fullNamesData, setFullNamesData] = React.useState([]);
    const [eventNamesData, setEventNamesData] = React.useState([]);

    useEffect(() => {
        setFormValue(getInitial(activity));
    }, [activity]);

    useEffect(() => {
        setFullNamesData(_.map(fullNames, (v) => ({label: v, value: v})));
    }, [setFullNamesData, fullNames]);

    useEffect(() => {
        setEventNamesData(_.map(eventNames, (v) => ({label: v, value: v})));
    }, [eventNames, setEventNamesData]);

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        debugger;
        console.log(formValue);
        onSubmit(formValue);
    };

    const handleReset = () => {
        setFormError({});
        setFormValue(getInitial(activity));
        onClose();
    };

    return <Modal open={open} onClose={onClose} size="xs">
        <Modal.Header>
            <Modal.Title>Активність в події</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form 
                fluid 
                model={model} 
                ref={formRef}
                onChange={setFormValue}
                onCheck={setFormError}
                formValue={formValue}
            >
                <Form.Group controlId="person">
                    <Form.ControlLabel>Людина:</Form.ControlLabel>
                    <Form.Control name="person" accepter={getSelect} data={fullNamesData} />
                </Form.Group>
                <Form.Group controlId="event">
                    <Form.ControlLabel>Подія:</Form.ControlLabel>
                    <Form.Control name="event" accepter={getSelect} data={eventNamesData} />
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.ControlLabel>Роль</Form.ControlLabel>
                    <Form.Control name="role" error={formError.role} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.ControlLabel>Опис вкладу</Form.ControlLabel>
                    <Form.Control name="description" error={formError.description} accepter={getInput} />
                </Form.Group>
                <Form.Group>
                <ButtonToolbar style={{margin: 'auto', width: 'fit-content'}}>
                    <Button appearance="primary" onClick={handleSubmit}>Змінити</Button>
                    <Button appearance="default" onClick={handleReset}>Відмінити</Button>
                </ButtonToolbar>
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>;
}

export default ActivityModal;