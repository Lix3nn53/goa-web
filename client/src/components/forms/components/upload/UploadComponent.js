import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomInput = (props) => {
  const [file, setFile] = useState(undefined);

  const { fieldKey, setFieldValue, errorMessage } = props;

  const handleChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setFile(file);
      };
      reader.readAsDataURL(file);
      setFieldValue(fieldKey, file);
    }
  };

  return (
    <div className="">
      <input
        className="form-control"
        id={fieldKey}
        name={fieldKey}
        type="file"
        onChange={handleChange}
      />
      {file && errorMessage ? (
        <div className="text-danger">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;

CustomInput.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
};
