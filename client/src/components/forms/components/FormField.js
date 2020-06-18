import React from "react";
import PropTypes from "prop-types";

import { Field, ErrorMessage } from "formik";

const FormField = (props) => {
  const { fieldKey, fieldType, name, errors, touched } = props;

  const renderLabel = () => {
    if (props.label) {
      return <label htmlFor={fieldKey}>{name}</label>;
    }
  };

  const placeholder = () => {
    if (props.label) {
      return "Enter " + name;
    } else {
      return name;
    }
  };

  return (
    <div className="form-group col" key={fieldKey}>
      {renderLabel()}
      <Field
        name={fieldKey}
        type={fieldType}
        className={
          "form-control " +
          (errors[fieldKey] && touched[fieldKey] ? " is-invalid" : "")
        }
        placeholder={placeholder()}
      />
      <ErrorMessage
        name={fieldKey}
        render={(msg) => (
          <div className="invalid-feedback text-danger">{msg}</div>
        )}
      />
    </div>
  );
};

export default FormField;

FormField.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  label: PropTypes.bool,
};
