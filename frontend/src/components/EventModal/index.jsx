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
  dateToString,
  DATE_FORMAT_FOR_FORMS,
  IMAGE_FORMATS
} from "../../helpers/constants";
import { localization } from "../../utils/localization";

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(localization.reqField),
  dateStart: DateType().isRequired(localization.reqField),
  dateEnd: DateType(),
  about: StringType()
    .isRequired(localization.reqField)
    .minLength(10, "Мінімально 10 символів.")
    .maxLength(100, "Максимально 100 символів."),
  description: StringType()
    .isRequired(localization.reqField)
    .minLength(30, "Мінімально 30 символів.")
    .maxLength(1000, "Максимально 1000 символів."),
  category: StringType().isRequired(localization.reqField)
});

const getInitial = (event) => ({
  name: event.name || "",
  dateStart: stringToDateObj(event.dateStart)?.toDate(),
  dateEnd: stringToDateObj(event.dateEnd)?.toDate(),
  about: event.about || "",
  description: event.description || "",
  category: event.category || "",
  photo: event.photo || "",
});

const getUploader = props => (
  <Uploader 
    {...props}
    draggable
    listType="picture-text"
    shouldQueueUpdate={(fileList, newFile) => fileList.length <= 1 && _.includes(IMAGE_FORMATS, newFile?.[0]?.blobFile.type)}
    action="/api/image" 
    method="POST"
    headers={{Authorization: `Bearer ${localStorage.getItem("token")}`}} 
    name="image"
  >
    <div style={{ lineHeight: "50px" }}>
      {localization.uploadArea}
    </div>
  </Uploader>
);

const getInput = (props) => (
  <Input as="textarea" {...props} style={{ height: "120px" }} />
);

const getInputPicker = (props) => (
  <InputPicker style={{ width: "100%" }} {...props} />
);

const EventModal = ({ open, categories, event = {}, onClose, onSubmit }) => {
  const formRef = React.useRef();
  const uploader = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState(getInitial({}));
  const [categoryData, setCategoryData] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);

  useEffect(() => {
    setFormValue(getInitial(event));
  }, [event]);

  useEffect(() => {
    setCategoryData(
      _.map(categories, (category) => ({
        label: category,
        value: category,
      }))
    );
  }, [categories]);

  const handleReset = () => {
    setFormError({});
    setFormValue(getInitial(event));
    onClose();
  };

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    onSubmit({
      ...formValue,
      dateStart: dateToString(formValue.dateStart),
      dateEnd: dateToString(formValue.dateEnd),
      id: event.id,
      photo: _.isString(formValue.photo) ? formValue.photo : event.photo,
    });

    handleReset();
  };

  const onCreateCategory = (value, item) => {
    setCategoryData([...categoryData, { label: value, value }]);
  };

  const onSuccess = response => {
    setFormValue({...formValue, photo: response.url});
    onLoadEnd();
  }

  const onRemove = () => {
    setFormValue({...formValue, photo: event.photo || ''});
    onLoadEnd()
  }

  const onLoadStart = () => setImageLoading(true);
  const onLoadEnd = () => setImageLoading(false);

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>{localization.event}</Modal.Title>
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
          <Form.Group controlId="name">
            <Form.ControlLabel>{localization.name}</Form.ControlLabel>
            <Form.Control name="name" error={formError.name} />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.ControlLabel>{localization.category}</Form.ControlLabel>
            <Form.Control
              name="category"
              error={formError.category}
              creatable
              data={categoryData}
              accepter={getInputPicker}
              onCreate={onCreateCategory}
            />
          </Form.Group>
          <Form.Group controlId="dateStart">
            <Form.ControlLabel>{localization.eventStart}</Form.ControlLabel>
            <Form.Control
              name="dateStart"
              format={DATE_FORMAT_FOR_FORMS}
              error={formError.dateStart}
              accepter={({ ...props }) => (
                <DatePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="dateEnd">
            <Form.ControlLabel>{localization.eventEnd}</Form.ControlLabel>
            <Form.Control
              name="dateEnd"
              format={DATE_FORMAT_FOR_FORMS}
              error={formError.dateEnd}
              accepter={({ ...props }) => (
                <DatePicker style={{ width: "100%" }} {...props} />
              )}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.ControlLabel>{localization.image}</Form.ControlLabel>
            <Form.Control name="photo" accepter={getUploader} ref={uploader} onSuccess={onSuccess} onUpload={onLoadStart} onError={onLoadEnd} onRemove={onRemove} />
          </Form.Group>
          <Form.Group controlId="about">
            <Form.ControlLabel>{localization.shortDescription}</Form.ControlLabel>
            <Form.Control
              name="about"
              error={formError.about}
              accepter={getInput}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>{localization.details}</Form.ControlLabel>
            <Form.Control
              name="description"
              error={formError.description}
              accepter={getInput}
            />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar style={{ margin: "auto", width: "fit-content" }}  >
              <Button appearance="primary" onClick={handleSubmit} disabled={imageLoading}>
                {localization.apply}
              </Button>
              <Button appearance="default" onClick={handleReset} disabled={imageLoading}>
                {localization.cancel}
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
