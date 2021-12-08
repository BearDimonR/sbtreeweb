import React, { useEffect } from 'react';
import { Modal, Form, ButtonToolbar, Button, DateRangePicker, Uploader, Schema, Input } from 'rsuite';

const { StringType, ArrayType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  dateRangePicker: ArrayType().minLength(2, 'Thi field is required.'),
  description: StringType().isRequired('This field is required.').minLength(30, 'Write more.').maxLength(3000, 'Max length 3000.'),
  category: StringType().isRequired('This field is required'),
});

const getInitial = (event) => ({
        name: event.name || '',
        dateRangePicker: [Date.parse(event.start) || new Date(), Date.parse(event.end) || new Date()],
        description: event.description || '',
        category: event.category || '',
});

const getUploader = () => (
        <Uploader draggable>
            <div style={{lineHeight: '50px'}}>Click or Drag files to this area to upload</div>
        </Uploader>
    )
const getInput = (props) => <Input as="textarea" {...props} style={{height: '120px'}} />;

const EventModal = ({open, user, event={}, onClose, onSubmit}) => {
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState(getInitial(event));

    useEffect(() => {
        setFormValue(getInitial(event));
    }, [event]);

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
        setFormValue(getInitial(event));
        onClose();
    };

    return <Modal open={open} onClose={onClose} size="xs">
        <Modal.Header>
            <Modal.Title>Подія</Modal.Title>
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
                <Form.Group controlId="name">
                    <Form.ControlLabel>Назва події</Form.ControlLabel>
                    <Form.Control name="name" error={formError.name} />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.ControlLabel>Категорія</Form.ControlLabel>
                    <Form.Control name="category" error={formError.category} />
                </Form.Group>
                <Form.Group controlId="dateRangePicker">
                    <Form.ControlLabel>Дати проведення події</Form.ControlLabel>
                    <Form.Control name="dateRangePicker" error={formError.dateRangePicker} accepter={({...props}) => <DateRangePicker style={{width:'100%'}} {...props} />} />
                </Form.Group>
                <Form.Group controlId="uploader">
                    <Form.ControlLabel>Картинка</Form.ControlLabel>
                    <Form.Control name="uploader" accepter={getUploader} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.ControlLabel>Детальний опис події</Form.ControlLabel>
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

export default EventModal;