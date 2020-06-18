import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const CustomInput = (props) => {
  const [files, setFiles] = useState(undefined);

  const { fieldKey, setFieldValue, errorMessage } = props;

  const handleChange = (e) => {
    e.preventDefault();
    let newFiles = Array.from(e.target.files);
    let newFormValue = [];

    newFiles.forEach((file, index) => {
      let reader = new FileReader();
      if (file) {
        reader.onloadend = () => {};
        reader.readAsDataURL(file);
        newFormValue.push(file);
      }
    });

    if (files) {
      newFormValue.push(...files);
    }
    setFiles(newFormValue);
    setFieldValue(fieldKey, newFormValue);
  };

  const removeFile = (index) => {
    if (files) {
      files.splice(index, 1);
    }
    setFiles(files);
    setFieldValue(fieldKey, files);
  };

  const displayFiles = () => {
    if (files) {
      const list = [];

      files.forEach((value, index) => {
        list.push(
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            <button
              className="btn badge badge-pill badge-light"
              onClick={() => removeFile(index)}
              type="button"
              style={{
                background: "transparent",
                border: "none",
              }}
            >
              X
            </button>
            {value.name}
          </li>
        );
      });

      return <ul className="list-group">{list}</ul>;
    }
  };

  return (
    <div className="">
      {displayFiles()}
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id={fieldKey}
          name={fieldKey}
          aria-describedby="inputGroupFileAddon01"
          onChange={handleChange}
          multiple
        />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          <FontAwesomeIcon className="mr-2" icon={faUpload} />
          Add files to upload
        </label>
      </div>
      {files && errorMessage ? (
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
