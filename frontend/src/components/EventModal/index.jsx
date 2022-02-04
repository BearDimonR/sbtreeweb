import React, { useEffect } from "react";
import {
  Modal,
  Form,
  ButtonToolbar,
  Button,
  DateRangePicker,
  Uploader,
  Schema,
  Input,
} from "rsuite";
import _ from "lodash";

const { StringType, ArrayType } = Schema.Types;

const reqField = "Це поле не може бути пустим";

const model = Schema.Model({
  name: StringType().isRequired(reqField),
  dateRangePicker: ArrayType().minLength(2, reqField),
  about: StringType()
    .isRequired(reqField)
    .minLength(30, "Мінімально 10 символів.")
    .maxLength(1000, "Мінімально 1000 символів."),
  category: StringType().isRequired(reqField),
});

const getInitial = (event) => ({
  name: event.name || "",
  dateRangePicker: [
    new Date(event.start) || new Date(),
    new Date(event.end) || new Date(),
  ],
  about: event.about || "",
  category: event.category || "",
});

const getUploader = () => (
  <Uploader draggable>
    <div style={{ lineHeight: "50px" }}>
      Click or Drag files to this area to upload
    </div>
  </Uploader>
);
const getInput = (props) => (
  <Input as="textarea" {...props} style={{ height: "120px" }} />
);

const EventModal = ({ open, user, event = {}, onClose, onSubmit }) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState(getInitial({}));

  useEffect(() => {
    setFormValue(getInitial(event));
  }, [event]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    onSubmit(
      _.omit(
        {
          ...formValue,
          start: formValue.dateRangePicker[0],
          end: formValue.dateRangePicker[1],
          id: event.id,
        },
        "dateRangePicker"
      )
    );
    handleReset();
  };

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(event));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
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
            <Form.Control
              name="dateRangePicker"
              error={formError.dateRangePicker}
              accepter={({ ...props }) => (
                <DateRangePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="uploader">
            <Form.ControlLabel>Картинка</Form.ControlLabel>
            <Form.Control name="uploader" accepter={getUploader} />
          </Form.Group>
          <Form.Group controlId="about">
            <Form.ControlLabel>Детальний опис події</Form.ControlLabel>
            <Form.Control
              name="about"
              error={formError.about}
              accepter={getInput}
            />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar style={{ margin: "auto", width: "fit-content" }}>
              <Button appearance="primary" onClick={handleSubmit}>
                Змінити
              </Button>
              <Button appearance="default" onClick={handleReset}>
                Відмінити
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
