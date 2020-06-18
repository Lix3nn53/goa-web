import React from "react";
import PropTypes from "prop-types";

import { Field, ErrorMessage } from "formik";

const FormFieldSelect = (props) => {
  const { fieldKey, fieldOptions, name, errors, touched } = props;

  return (
    <div className="form-group col" key={fieldKey}>
      <label htmlFor={fieldKey}>{name}</label>
      <Field
        name={fieldKey}
        as="select"
        className={
          "form-control" +
          (errors[fieldKey] && touched[fieldKey] ? " is-invalid" : "")
        }
        placeholder={"Select " + name}
      >
        <option hidden>{"Select " + name}</option>

        {fieldOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={fieldKey}
        className="invalid-feedback"
        render={(msg) => <div className="text-danger">{msg}</div>}
      />
    </div>
  );
};

export default FormFieldSelect;

FormFieldSelect.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  fieldOptions: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};
