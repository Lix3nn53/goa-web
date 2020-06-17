import React, { Component } from "react";
import Spinner from "../util/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { minecraftUsernameRegex } from "assets/regex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

class MinecraftForm extends Component {
  getInitialValues() {
    var initialValuesMap = { minecraftUsername: "" };

    if (this.props.formValues && this.props.auth) {
      initialValuesMap = {
        minecraftUsername:
          this.props.formValues.minecraftUsername ||
          this.props.auth.minecraftUsername ||
          "",
      };
    } else if (this.props.auth) {
      initialValuesMap = {
        minecraftUsername: this.props.auth.minecraftUsername || "",
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

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  render() {
    switch (this.props.auth) {
      case null:
        return <Spinner />;
      case false:
        return (
          <div className="row">
            <button
              className="mt-4 btn mx-auto"
              href="#loginModal"
              onClick={this.showLoginModal}
            >
              <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
              Login
            </button>
          </div>
        );
      default:
        return (
          <div className="container">
            <div className="row">
              <Formik
                className="col-6"
                initialValues={this.getInitialValues()}
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
                  await this.props.onFormSubmit(fields);

                  setSubmitting(false);
                }}
              >
                {({ errors, status, touched }) => (
                  <Form className="d-block mx-auto px-2">
                    <div className="form-group" key="minecraftUsername">
                      <label htmlFor="minecraftUsername">
                        Minecraft Username
                      </label>
                      <Field
                        name="minecraftUsername"
                        type="text"
                        className={
                          "form-control" +
                          (errors.minecraftUsername && touched.minecraftUsername
                            ? " is-invalid"
                            : "")
                        }
                        placeholder="Your ingame username"
                      />
                      <ErrorMessage
                        name="minecraftUsername"
                        className="invalid-feedback"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
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
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withRouter(MinecraftForm));
