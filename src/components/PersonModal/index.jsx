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
import style from "./index.module.scss";

const { StringType, ArrayType } = Schema.Types;

const reqField = "Це поле не може бути пустим";

const model = Schema.Model({
  pib: StringType()
    .isRequired(reqField)
    .addRule((value, data) => {
      const spl = value.split(" ").length;
      return spl === 2 || spl === 3;
    }, "Мінімум 2 слова (прізвище з пробілом замініть на '_')"),
  dateRangePicker: ArrayType().minLength(2, reqField),
  about: StringType()
    .isRequired(reqField)
    .minLength(30, "Мінімум 30 символів")
    .maxLength(3000, "Максимум 3000 символів"),
  status: StringType().isRequired(reqField),
  email: StringType()
    .isRequired(reqField)
    .isEmail("Не вірний формат (example@example.com)"),
  telephone: StringType()
    .isRequired(reqField)
    .pattern(
      /^[+][0-9]{2}?[\s]?[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-\s]?[0-9]{4}$/im,
      "Не вірний формат (+38(098) 123-1234)"
    ),
});

const getInitial = (person) => ({
  pib: `${person.surname} ${person.name} ${person.parental}`.trim() || "",
  status: person.status || "",
  email: person.email || "",
  telephone: person.telephone || "",
  dateRangePicker: [
    new Date(person.start) || new Date(),
    new Date(person.end) || new Date(),
  ],
  about: person.about || "",
  category: person.category || "",
});

const getUploader = () => (
  <Uploader draggable>
    <div style={{ lineHeight: "50px" }}>
      Click or Drag files to this area to upload
    </div>
  </Uploader>
);
const getInput = (props) => (
  <Input as="textarea" {...props} style={{ height: "80px" }} />
);

const PersonModal = ({ open, user, person, onClose, onSubmit }) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState(getInitial({}));

  useEffect(() => {
    setFormValue(getInitial(person));
  }, [person]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    const spl = formValue.pib.split(" ");
    onSubmit(
      _.omit(
        {
          ...formValue,
          start: formValue.dateRangePicker[0],
          end: formValue.dateRangePicker[1],
          id: person.id,
          surname: spl[0],
          name: spl[1],
          parental: spl.length === 3 ? spl[2] : "",
        },
        "dateRangePicker"
      )
    );
    handleReset();
  };

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(person));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Людина</Modal.Title>
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
          <Form.Group controlId="pib">
            <Form.ControlLabel>ПІБ</Form.ControlLabel>
            <Form.Control name="pib" error={formError.pib} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" error={formError.email} />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="telephone" error={formError.telephone} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.ControlLabel>Статус</Form.ControlLabel>
            <Form.Control name="status" error={formError.status} />
          </Form.Group>
          <Form.Group controlId="dateRangePicker">
            <Form.ControlLabel>Дата вступу (Випуску)</Form.ControlLabel>
            <Form.Control
              name="dateRangePicker"
              error={formError.dateRangePicker}
              accepter={({ ...props }) => (
                <DateRangePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="uploader">
            <Form.ControlLabel>Аватарка</Form.ControlLabel>
            <Form.Control name="uploader" accepter={getUploader} />
          </Form.Group>
          <Form.Group controlId="about">
            <Form.ControlLabel>Про себе</Form.ControlLabel>
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

export default PersonModal;
