import React from "react";
import PropTypes from "prop-types";

import { Field } from "formik";

const FormFieldSwitch = (props) => {
  const { fieldKey, name } = props;

  return (
    <div className="form-group col my-auto mx-auto" key={fieldKey}>
      <div className="custom-control custom-switch custom-switch-xl">
        <div className="text-center">
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

export default FormFieldSwitch;

FormFieldSwitch.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
