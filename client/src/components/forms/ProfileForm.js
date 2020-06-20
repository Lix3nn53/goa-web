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
    return {
      username: formValues ? formValues.username : auth ? auth.username : "",
      email: formValues ? formValues.email : auth ? auth.email : "",
    };
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

  if (auth === null) {
    return <Spinner />;
  } else if (!auth) {
    return <p className="text-center">You must be logged in</p>;
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
        await props.onFormSubmit(fields);

        setSubmitting(false);
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
