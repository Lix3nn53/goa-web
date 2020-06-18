import React from "react";
import PropTypes from "prop-types";

import { Field, ErrorMessage } from "formik";

const FormFieldPrependDouble = (props) => {
  const {
    fieldKey,
    fieldKeySecond,
    fieldType,
    fieldTypeSecond,
    name,
    nameSecond,
    errors,
    touched,
    prepend,
  } = props;

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

  const placeholderSecond = () => {
    if (props.label) {
      return "Enter " + nameSecond;
    } else {
      return nameSecond;
    }
  };

  return (
    <div className="form-group col" key={fieldKey}>
      {renderLabel()}
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">{prepend}</div>
        </div>
        <Field
          name={fieldKey}
          type={fieldType}
          className={
            "form-control " +
            props.className +
            (errors[fieldKey] && touched[fieldKey] ? " is-invalid" : "")
          }
          placeholder={placeholder()}
        />
        <Field
          name={fieldKeySecond}
          type={fieldTypeSecond}
          className={
            "form-control " +
            props.classNameSecond +
            (errors[fieldKeySecond] && touched[fieldKeySecond]
              ? " is-invalid"
              : "")
          }
          placeholder={placeholderSecond()}
        />
        <ErrorMessage
          name={fieldKey}
          className="col"
          render={(msg) => (
            <div className="invalid-feedback text-danger">{msg}</div>
          )}
        />
        <ErrorMessage
          name={fieldKeySecond}
          className="col"
          render={(msg) => (
            <div className="invalid-feedback text-danger">{msg}</div>
          )}
        />
      </div>
    </div>
  );
};

export default FormFieldPrependDouble;

FormFieldPrependDouble.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  fieldKeySecond: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  fieldTypeSecond: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameSecond: PropTypes.string.isRequired,
  className: PropTypes.string,
  classNameSecond: PropTypes.string,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  prepend: PropTypes.string.isRequired,
};
