import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "components/forms/components/FormField";
import FormFieldAppend from "components/forms/components/FormFieldAppend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import CreditSelectionCard from "components/credits/CreditSelectionCard";

import $ from "jquery";

function CardForm(props) {
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  const { formValues, onCancel } = props;

  const renderBackButton = () => {
    if (onCancel) {
      return (
        <button className="btn btn-secondary float-left" onClick={onCancel}>
          Back
        </button>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Formik
          className="col-lg-8"
          initialValues={{
            cardHolderName: "",
            cardNumber: "",
            expireYear: "",
            expireMonth: "",
            cvc: "",
          }}
          validationSchema={Yup.object().shape({
            cardHolderName: Yup.string()
              .min(5, "cardHolderName must be at least 5 characters")
              .max(50, "cardHolderName must be at most 50 characters")
              .matches(
                /^([a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                "cardHolderName must be at least 2 words"
              )
              .required("required"),
            cardNumber: Yup.number().required("required"),
            expireYear: Yup.number()
              .min(1, "Between 1-99")
              .max(99, "Between 1-99")
              .required("required"),
            expireMonth: Yup.number()
              .min(1, "Between 1-12")
              .max(12, "Between 1-12")
              .required("required"),
            cvc: Yup.number()
              .min(100, "Must be 3 digits")
              .max(999, "Must be 3 digits")
              .required("required"),
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
                  fieldKey="cardHolderName"
                  fieldType="text"
                  name="Name on card"
                  errors={errors}
                  touched={touched}
                  label={true}
                />
              </div>

              <div className="form-row">
                <FormField
                  fieldKey="expireMonth"
                  fieldType="text"
                  name="Month"
                  errors={errors}
                  touched={touched}
                  label={true}
                />
                <FormField
                  fieldKey="expireYear"
                  fieldType="text"
                  name="Year"
                  errors={errors}
                  touched={touched}
                  label={true}
                />
              </div>

              <div className="form-row">
                <FormField
                  fieldKey="cardNumber"
                  fieldType="text"
                  name="Card number"
                  errors={errors}
                  touched={touched}
                  label={true}
                />
                <FormFieldAppend
                  fieldKey="cvc"
                  fieldType="text"
                  name="Cvc"
                  errors={errors}
                  touched={touched}
                  label={true}
                  append={
                    <span
                      className=""
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Three-digits code on the back of your card"
                    >
                      <FontAwesomeIcon icon={faQuestionCircle} />
                    </span>
                  }
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
        <CreditSelectionCard
          className="col-lg-4"
          creditSelection={{
            productId: formValues.creditSelection.productId,
            price: formValues.creditSelection.price,
            name: formValues.creditSelection.name,
            description: formValues.creditSelection.description,
            category: formValues.creditSelection.category,
            icon: formValues.creditSelection.icon,
          }}
        />
      </div>
    </div>
  );
}

export default CardForm;

CardForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onCancel: PropTypes.func,
};
