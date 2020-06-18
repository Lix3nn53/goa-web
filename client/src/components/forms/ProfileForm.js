import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../util/Spinner";
import { Formik } from "formik";

import { emailRegex, usernameRegex } from "assets/regex";
import * as Yup from "yup";
import FormField from "components/forms/components/FormField";

function ProfileForm(props) {
  const auth = useSelector((state) => state.auth);

  const { formValues, onCancel } = props;

  const getInitialValues = () => {
    var initialValuesMap = {
      username: "",
      email: "",
    };

    if (formValues && auth) {
      initialValuesMap = {
        username: formValues.username || auth.username || "",
        email: formValues.email || auth.email || "",
      };
    } else {
      initialValuesMap = {
        username: auth.username || "",
        email: auth.email || "",
      };
    }

    return initialValuesMap;
  };

  const renderBackButton = () => {
    if (onCancel) {
      return (
        <button className="btn btn-secondary float-left" onClick={onCancel}>
          Back
        </button>
      );
    }
  };

  if (!auth) {
    return <Spinner />;
  }

  return (
    <Formik
      className="col"
      initialValues={getInitialValues()}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(2, "min 2 characters")
          .max(25, "max 25 characters")
          .matches(usernameRegex, "Username is invalid")
          .required("Name is required"),
        email: Yup.string()
          .matches(emailRegex, "Email is invalid")
          .required("Email is required"),
      })}
      onSubmit={async (fields, { setSubmitting }) => {
        setSubmitting(true);
        console.log("a");
        await props.onFormSubmit(fields);

        setSubmitting(false);
        console.log("b");
      }}
    >
      {({
        handleSubmit,
        errors,
        values,
        status,
        touched,
        isSubmitting,
        handleBlur,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="d-block mx-auto px-2">
          <div className="form-row">
            <FormField
              fieldKey="username"
              fieldType="text"
              name="Username"
              errors={errors}
              touched={touched}
            />
          </div>

          <div className="form-row">
            <FormField
              fieldKey="email"
              fieldType="email"
              name="Email"
              errors={errors}
              touched={touched}
            />
          </div>

          <div className="my-3" key="buttons">
            <button
              className="btn btn-primary float-right"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            {renderBackButton()}
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ProfileForm;

ProfileForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onCancel: PropTypes.func,
};
