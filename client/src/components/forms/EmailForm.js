import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyModal, fetchUser } from "store/actions";
import PropTypes from "prop-types";

import Spinner from "../util/Spinner";
import { Formik } from "formik";

import { emailRegex } from "assets/regex";
import * as Yup from "yup";
import FormField from "components/forms/components/FormField";
import userAPI from "api/userAPI";

function EmailForm(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { formValues, onCancel } = props;

  const getInitialValues = () => {
    return {
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

  const onFormSubmit = async (fields) => {
    const apiRes = await userAPI.updateUser(fields);

    const { success } = apiRes;

    console.log(fields);

    if (success) {
      dispatch(notifyModal(true, "success", "Changes saved"));
      dispatch(fetchUser());
    } else {
      const { errorMessage } = apiRes;
      dispatch(notifyModal(true, "warning", errorMessage));
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
        email: Yup.string()
          .matches(emailRegex, "Email is invalid")
          .required("Email is required"),
      })}
      onSubmit={async (fields, { setSubmitting }) => {
        setSubmitting(true);
        await onFormSubmit(fields);

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

export default EmailForm;

EmailForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onCancel: PropTypes.func,
};
