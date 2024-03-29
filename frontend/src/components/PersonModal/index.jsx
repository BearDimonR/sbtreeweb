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
  IMAGE_FORMATS,
} from "../../helpers/constants";
import { localization } from "../../utils/localization";

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  pib: StringType()
    .isRequired(localization.reqField)
    .addRule((value, data) => {
      const spl = value.split(" ").length;
      return spl === 2 || spl === 3;
    }, "Мінімум 2 слова (прізвище з пробілом замініть на '_')"),
  dateBirth: DateType().isRequired(localization.reqField),
  dateIn: DateType().isRequired(localization.reqField),
  dateOut: DateType(),
  about: StringType()
    .isRequired(localization.reqField)
    .minLength(30, "Мінімум 30 символів")
    .maxLength(3000, "Максимум 3000 символів"),
  status: StringType().isRequired(localization.reqField),
  email: StringType()
    .isRequired(localization.reqField)
    .isEmail("Не вірний формат (example@example.com)"),
  faculty: StringType().isRequired(localization.reqField),
  specialty: StringType().isRequired(localization.reqField),
  parent: StringType().isRequired(localization.reqField),
  telephone: StringType().pattern(
    /^[+][0-9]{2}?[\s]?[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-\s]?[0-9]{4}$/im,
    "Не вірний формат: (+38(098) 123-1234)"
  ),
});

const getInitial = (person) => {
  return {
    pib:
      `${person.surname || ""} ${person.name || ""} ${
        person.parental || ""
      }`.trim() || "",
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
    avatar: person.avatar || "",
  };
};

const getUploader = (props) => (
  <Uploader
    {...props}
    draggable
    shouldQueueUpdate={(fileList, newFile) =>
      fileList.length <= 1 &&
      _.includes(IMAGE_FORMATS, newFile?.[0]?.blobFile.type)
    }
    action="/api/image"
    method="POST"
    headers={{ Authorization: `Bearer ${localStorage.getItem("token")}` }}
    name="image"
  >
    <div style={{ lineHeight: "50px" }}>{localization.uploadArea}</div>
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
  const uploader = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState(getInitial({}));
  const [specialtyData, setSpecialtyData] = React.useState([]);
  const [fullNamesData, setFullNamesData] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);

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

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(person));
    onClose();
  };

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
      avatar: _.isString(formValue.avatar) ? formValue.avatar : person.photo,
    });

    handleReset();
  };

  const onCreateSpecialty = (value, item) => {
    setSpecialtyData([...specialtyData, { label: value, value }]);
  };

  const onSuccess = (response) => {
    setFormValue({ ...formValue, avatar: response.url });
    onLoadEnd();
  };

  const onRemove = () => {
    setFormValue({ ...formValue, avatar: person.avatar || "" });
    onLoadEnd();
  };

  const onLoadStart = () => setImageLoading(true);
  const onLoadEnd = () => setImageLoading(false);

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>{localization.person}</Modal.Title>
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
            <Form.ControlLabel>{localization.fullName}</Form.ControlLabel>
            <Form.Control name="pib" error={formError.pib} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.ControlLabel>{localization.email}</Form.ControlLabel>
            <Form.Control name="email" error={formError.email} />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.ControlLabel>{localization.telephone}</Form.ControlLabel>
            <Form.Control name="telephone" error={formError.telephone} />
          </Form.Group>
          <Form.Group controlId="faculty">
            <Form.ControlLabel>{localization.faculty}</Form.ControlLabel>
            <Form.Control
              name="faculty"
              error={formError.faculty}
              data={FACULTIES}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="specialty">
            <Form.ControlLabel>{localization.speciality}</Form.ControlLabel>
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
            <Form.ControlLabel>{localization.patron}</Form.ControlLabel>
            <Form.Control
              name="parent"
              error={formError.parent}
              creatable
              data={fullNamesData}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="dateBirth">
            <Form.ControlLabel>{localization.birthday}</Form.ControlLabel>
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
            <Form.ControlLabel>{localization.memberDate}</Form.ControlLabel>
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
            <Form.ControlLabel>{localization.retirement}</Form.ControlLabel>
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
            <Form.ControlLabel>{localization.status}</Form.ControlLabel>
            <Form.Control
              name="status"
              error={formError.status}
              data={STATUSES}
              accepter={getInputPicker}
            />
          </Form.Group>
          <Form.Group controlId="avatar">
            <Form.ControlLabel>{localization.avatar}</Form.ControlLabel>
            <Form.Control
              name="avatar"
              accepter={getUploader}
              ref={uploader}
              onSuccess={onSuccess}
              onUpload={onLoadStart}
              onError={onLoadEnd}
              onRemove={onRemove}
            />
          </Form.Group>
          <Form.Group controlId="about">
            <Form.ControlLabel>{localization.about}</Form.ControlLabel>
            <Form.Control
              name="about"
              error={formError.about}
              accepter={getInput}
            />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar style={{ margin: "auto", width: "fit-content" }}>
              <Button
                appearance="primary"
                onClick={handleSubmit}
                disabled={imageLoading}
              >
                {localization.apply}
              </Button>
              <Button
                appearance="default"
                onClick={handleReset}
                disabled={imageLoading}
              >
                {localization.cancel}
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PersonModal;
