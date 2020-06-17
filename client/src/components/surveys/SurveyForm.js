import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

class SurveyForm extends Component {
  getInitialValues() {
    const initialValuesMap = {
      title: this.props.formValues.title || "",
      subject: this.props.formValues.subject || "",
      body: this.props.formValues.body || "",
      recipients: this.props.formValues.recipients || "",
    };

    return initialValuesMap;
  }

  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          subject: Yup.string().required("Subject is required"),
          body: Yup.string()
            .min(6, "Body must be at least 6 characters")
            .required("Body is required"),
          recipients: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        })}
        onSubmit={async (fields, { setSubmitting }) => {
          setSubmitting(true);
          await this.props.onSurveySubmit(fields);

          setSubmitting(false);
        }}
      >
        {({ errors, status, touched }) => (
          <Form className="d-block mx-auto px-2">
            <div className="form-row">
              <div className="form-group col" key="title">
                <label htmlFor="title">Survey Title</label>
                <Field
                  name="title"
                  type="text"
                  className={
                    "form-control" +
                    (errors.title && touched.title ? " is-invalid" : "")
                  }
                  placeholder="Survey Title"
                />
                <ErrorMessage
                  name="title"
                  className="invalid-feedback"
                  render={(msg) => <div className="text-danger">{msg}</div>}
                />
              </div>

              <div className="form-group col" key="subject">
                <label htmlFor="subject">Subject Line</label>
                <Field
                  name="subject"
                  type="text"
                  className={
                    "form-control" +
                    (errors.subject && touched.subject ? " is-invalid" : "")
                  }
                  placeholder="Subject Line"
                />
                <ErrorMessage
                  name="subject"
                  className="invalid-feedback"
                  render={(msg) => <div className="text-danger">{msg}</div>}
                />
              </div>
            </div>
            <div className="form-group" key="body">
              <label htmlFor="body">Email Body</label>
              <Field
                rows="2"
                component="textarea"
                name="body"
                type="text"
                className={
                  "form-control" +
                  (errors.body && touched.body ? " is-invalid" : "")
                }
                placeholder="Email Body"
              />
              <ErrorMessage
                name="body"
                className="invalid-feedback"
                render={(msg) => <div className="text-danger">{msg}</div>}
              />
            </div>

            <div className="form-group" key="recipients">
              <label htmlFor="recipients">Recipient List</label>
              <Field
                name="recipients"
                type="text"
                className={
                  "form-control" +
                  (errors.recipients && touched.recipients ? " is-invalid" : "")
                }
                placeholder="Recipient List"
              />
              <ErrorMessage
                name="recipients"
                className="invalid-feedback"
                render={(msg) => <div className="text-danger">{msg}</div>}
              />
            </div>

            <div className="" key="buttons" style={{ margin: "2rem" }}>
              <button
                className="btn btn-primary float-right"
                variant="primary"
                type="submit"
              >
                Submit
              </button>
              <button
                className="btn btn-secondary"
                style={{ marginLeft: "2rem" }}
                variant="secondary"
                type="reset"
              >
                Reset
              </button>
              <Link
                className="btn btn-secondary float-left"
                variant="secondary"
                to="/surveys"
              >
                Cancel
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default SurveyForm;
