import React, { Component } from "react";
import Spinner from "../util/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { emailRegex, usernameRegex } from "assets/regex";
import * as Yup from "yup";

class ProfileForm extends Component {
  getInitialValues() {
    var initialValuesMap = {
      username: "",
      email: "",
    };

    if (this.props.formValues && this.props.auth) {
      initialValuesMap = {
        username:
          this.props.formValues.username || this.props.auth.username || "",
        email: this.props.formValues.email || this.props.auth.email || "",
      };
    } else {
      initialValuesMap = {
        username: this.props.auth.username || "",
        email: this.props.auth.email || "",
      };
    }

    return initialValuesMap;
  }

  renderBackButton() {
    if (this.props.onCancel) {
      return (
        <button
          className="btn btn-secondary"
          variant="secondary"
          onClick={this.props.onCancel}
        >
          Back
        </button>
      );
    }
  }

  render() {
    if (!this.props.auth) {
      return <Spinner />;
    }

    return (
      <div className="container">
        <div className="row">
          <Formik
            className="col-6"
            initialValues={this.getInitialValues()}
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
              await this.props.onFormSubmit(fields);

              setSubmitting(false);
            }}
          >
            {({ errors, status, touched }) => (
              <Form className="d-block mx-auto px-2">
                <div className="form-row">
                  <div className="form-group col" key="username">
                    <label htmlFor="username">Name</label>
                    <Field
                      name="username"
                      type="text"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      className="invalid-feedback"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                </div>

                <div className="form-group" key="email">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    className="invalid-feedback"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>

                <div className="" key="buttons">
                  <button
                    className="btn btn-primary float-right"
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </button>

                  {this.renderBackButton()}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withRouter(ProfileForm));
