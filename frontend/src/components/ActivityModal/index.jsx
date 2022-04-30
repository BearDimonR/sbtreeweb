import React, { useEffect } from "react";
import _ from "lodash";
import style from "./index.module.scss";
import {
  Modal,
  Form,
  ButtonToolbar,
  Button,
  InputPicker,
  Schema,
  Input,
} from "rsuite";

const { StringType } = Schema.Types;

const reqField = "Це поле не може бути пустим";

const model = Schema.Model({
  person: StringType().isRequired(reqField),
  event: StringType().isRequired(reqField),
  contribution: StringType()
    .isRequired(reqField)
    .minLength(10, "Мінімально 10 символів.")
    .maxLength(500, "Максимально 500 символів."),
  position: StringType().isRequired(reqField),
});

const getInitial = (activity) => {
  return {
    person: activity?.personId || "",
    event: activity?.eventId || "",
    position: activity?.position || "",
    contribution: activity?.contribution || "",
  };
};

const getInput = (props) => (
  <Input as="textarea" {...props} style={{ height: "120px" }} />
);
const getInputPicker = (props) => (
  <InputPicker style={{ width: "100%" }} {...props} />
);

const ActivityModal = ({
  open,
  user,
  activity = {},
  fullNames,
  eventNames,
  onClose,
  onSubmit,
}) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({});
  const [fullNamesData, setFullNamesData] = React.useState([]);
  const [eventNamesData, setEventNamesData] = React.useState([]);

  useEffect(() => {
    setFormValue(getInitial(activity));
  }, [activity]);

  useEffect(() => {
    setFullNamesData(
      _.map(fullNames, (data) => ({ label: data.fullName, value: data.id }))
    );
  }, [setFullNamesData, fullNames]);

  useEffect(() => {
    setEventNamesData(
      _.map(eventNames, (data) => ({ label: data.name, value: data.id }))
    );
  }, [eventNames, setEventNamesData]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    onSubmit({
      ..._.omit(formValue, ["person", "event"]),
      id: activity.id,
      eventId: formValue.event,
      personId: formValue.person,
    });
    handleReset();
  };

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(activity));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Активність в події</Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.form}>
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
            <Form.Control
              name="person"
              error={formError.person}
              data={fullNamesData}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="event">
            <Form.ControlLabel>Подія:</Form.ControlLabel>
            <Form.Control
              name="event"
              error={formError.event}
              data={eventNamesData}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="position">
            <Form.ControlLabel>Роль</Form.ControlLabel>
            <Form.Control name="position" error={formError.position} />
          </Form.Group>
          <Form.Group controlId="contribution">
            <Form.ControlLabel>Опис вкладу</Form.ControlLabel>
            <Form.Control
              name="contribution"
              error={formError.contribution}
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

export default ActivityModal;
