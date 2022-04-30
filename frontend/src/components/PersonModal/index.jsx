import React, { useEffect } from "react";
import {
  Modal,
  Form,
  ButtonToolbar,
  Button,
  Uploader,
  Schema,
  Input,
  DatePicker,
  InputPicker,
} from "rsuite";
import _ from "lodash";
import style from "./index.module.scss";
import {
  stringToDateObj,
  DATE_FORMAT_FOR_FORMS,
  FACULTIES,
  STATUSES,
  dateToString,
} from "../../helpers/constants";

const { StringType, DateType, ObjectType } = Schema.Types;

const reqField = "Це поле не може бути пустим";

const model = Schema.Model({
  pib: StringType()
    .isRequired(reqField)
    .addRule((value, data) => {
      const spl = value.split(" ").length;
      return spl === 2 || spl === 3;
    }, "Мінімум 2 слова (прізвище з пробілом замініть на '_')"),
  dateBirth: DateType().isRequired(reqField),
  dateIn: DateType().isRequired(reqField),
  dateOut: DateType(),
  about: StringType()
    .isRequired(reqField)
    .minLength(30, "Мінімум 30 символів")
    .maxLength(3000, "Максимум 3000 символів"),
  status: StringType().isRequired(reqField),
  email: StringType()
    .isRequired(reqField)
    .isEmail("Не вірний формат (example@example.com)"),
  faculty: StringType().isRequired(reqField),
  specialty: StringType().isRequired(reqField),
  parent: StringType().isRequired(reqField),
  telephone: StringType().pattern(
    /^[+][0-9]{2}?[\s]?[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-\s]?[0-9]{4}$/im,
    "Не вірний формат: (+38(098) 123-1234)"
  ),
  uploader: ObjectType(),
});

const getInitial = (person) => {
  return {
    pib: `${person.surname} ${person.name} ${person.parental}`.trim() || "",
    status: person.status || "",
    email: person.email || "",
    telephone: person.telephone || "",
    dateBirth: stringToDateObj(person.dateBirth)?.toDate(),
    dateIn: stringToDateObj(person.dateIn)?.toDate(),
    dateOut: stringToDateObj(person.dateOut)?.toDate(),
    faculty: person.faculty || "",
    specialty: person.specialty || "",
    parent: person.parentId || "",
    about: person.about || "",
  };
};

const getUploader = () => (
  <Uploader draggable action="">
    <div style={{ lineHeight: "50px" }}>
      Click or Drag files to this area to upload
    </div>
  </Uploader>
);
const getInput = (props) => (
  <Input as="textarea" {...props} style={{ height: "80px" }} />
);

const getInputPicker = (props) => (
  <InputPicker style={{ width: "100%" }} {...props} />
);

const PersonModal = ({
  open,
  fullNames,
  specialties,
  person,
  onClose,
  onSubmit,
}) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState(getInitial({}));
  const [specialtyData, setSpecialtyData] = React.useState([]);
  const [fullNamesData, setFullNamesData] = React.useState([]);

  useEffect(() => {
    setFormValue(getInitial(person));
  }, [person]);

  useEffect(() => {
    setSpecialtyData(_.map(specialties, (s) => ({ label: s, value: s })));
  }, [specialties]);

  useEffect(() => {
    setFullNamesData(
      _.map(fullNames, (data) => ({ label: data.fullName, value: data.id }))
    );
  }, [fullNames]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    const spl = formValue.pib.split(" ");
    onSubmit({
      ..._.omit(formValue, ["person", "event", "pib", "parent"]),
      surname: spl[0],
      name: spl[1],
      parental: spl.length === 3 ? spl[2] : "",
      parentId: formValue.parent,
      dateIn: dateToString(formValue.dateIn),
      dateBirth: dateToString(formValue.dateBirth),
      dateOut: dateToString(formValue.dateOut),
      id: person.id,
    });
    handleReset();
  };

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(person));
    onClose();
  };

  const onCreateSpecialty = (value, item) => {
    setSpecialtyData([...specialtyData, { label: value, value }]);
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
          <Form.Group controlId="faculty">
            <Form.ControlLabel>Факультет</Form.ControlLabel>
            <Form.Control
              name="faculty"
              error={formError.faculty}
              data={FACULTIES}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="specialty">
            <Form.ControlLabel>Спеціальність</Form.ControlLabel>
            <Form.Control
              name="specialty"
              error={formError.specialty}
              creatable
              data={specialtyData}
              accepter={getInputPicker}
              onCreate={onCreateSpecialty}
            />
          </Form.Group>
          <Form.Group controlId="parent">
            <Form.ControlLabel>Патрон</Form.ControlLabel>
            <Form.Control
              name="parent"
              error={formError.parent}
              creatable
              data={fullNamesData}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="dateBirth">
            <Form.ControlLabel>Дата народження</Form.ControlLabel>
            <Form.Control
              name="dateBirth"
              format={DATE_FORMAT_FOR_FORMS}
              error={formError.dateBirth}
              accepter={({ ...props }) => (
                <DatePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="dateIn">
            <Form.ControlLabel>Дата висвяти</Form.ControlLabel>
            <Form.Control
              name="dateIn"
              format={DATE_FORMAT_FOR_FORMS}
              error={formError.dateIn}
              accepter={({ ...props }) => (
                <DatePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="dateOut">
            <Form.ControlLabel>Дата пошанування</Form.ControlLabel>
            <Form.Control
              name="dateOut"
              format={DATE_FORMAT_FOR_FORMS}
              error={formError.dateOut}
              accepter={({ ...props }) => (
                <DatePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.ControlLabel>Статус</Form.ControlLabel>
            <Form.Control
              name="status"
              error={formError.status}
              data={STATUSES}
              accepter={getInputPicker}
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
