import React from "react";
import PropTypes from "prop-types";

import { Field } from "formik";
import FileUploadCustom from "./UploadComponent";
import FileMultipleUploadComponent from "./MultipleUploadComponent";

const FormField = (props) => {
  const { fieldKey, name, errors, setFieldValue, isMultiple } = props;

  const renderLabel = () => {
    if (props.label) {
      return <label htmlFor={fieldKey}>{name}</label>;
    }
  };

  return (
    <div className="form-group col" key={fieldKey}>
      {renderLabel()}
      <Field
        component={isMultiple ? FileMultipleUploadComponent : FileUploadCustom}
        setFieldValue={setFieldValue}
        errorMessage={errors[fieldKey] ? errors[fieldKey] : undefined}
        fieldKey={fieldKey}
      />
    </div>
  );
};

export default FormField;

FormField.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  label: PropTypes.bool,
  setFieldValue: PropTypes.func,
  isMultiple: PropTypes.bool,
};
