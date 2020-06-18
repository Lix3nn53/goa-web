import React from "react";
import PropTypes from "prop-types";

import { Field } from "formik";

const FormFieldCheckbox = (props) => {
  const { fieldKey, name } = props;

  return (
    <div className="form-group col my-auto mx-auto" key={fieldKey}>
      <div className="text-center">
        <div className="custom-control custom-checkbox checkbox-xl">
          <Field
            name={fieldKey}
            type="checkbox"
            className="custom-control-input"
            placeholder={"Enter " + name}
            id={fieldKey}
          />
          <label className="custom-control-label" htmlFor={fieldKey}>
            {name}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormFieldCheckbox;

FormFieldCheckbox.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
