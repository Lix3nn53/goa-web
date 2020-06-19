import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../util/Spinner";
import { Formik } from "formik";

import { minecraftUsernameRegex } from "assets/regex";
import * as Yup from "yup";
import FormField from "components/forms/components/FormField";

function MinecraftForm(props) {
  const auth = useSelector((state) => state.auth);

  const { formValues, onCancel } = props;

  const getInitialValues = () => {
    return {
      minecraftUsername: formValues
        ? formValues.minecraftUsername
        : auth
        ? auth.minecraftUsername
        : "",
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

  if (!auth) {
    return <Spinner />;
  }

  return (
    <Formik
      className="col"
      initialValues={getInitialValues()}
      validationSchema={Yup.object().shape({
        minecraftUsername: Yup.string()
          .matches(
            minecraftUsernameRegex,
            "3-16 characters, no spaces, The only allowed special character is _(underscore)"
          )
          .required("Minecraft Username is required"),
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
              fieldKey="minecraftUsername"
              fieldType="text"
              name="Minecraft Username"
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

export default MinecraftForm;

MinecraftForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onCancel: PropTypes.func,
};
