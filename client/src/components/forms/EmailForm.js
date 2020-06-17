import React, { Component } from "react";
import Spinner from "../util/Spinner";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notifyModal, updateUser } from "store/actions";
import { emailRegex } from "assets/regex";

class EmailForm extends Component {
  async onFormSubmit(fields) {
    if (this.props.auth) {
      this.props.notifyModal(true, "Please wait", "");

      const resData = await this.props.updateUser(fields);
      console.log(resData);

      if (resData.success) {
        this.props.notifyModal(
          true,
          "Success",
          "Changes saved and we sent you a new activation email."
        );
      } else {
        var message = "Failed";
        if (resData.message) message = resData.message;
        this.props.notifyModal(true, "Danger", message);
      }
    }
  }

  getInitialValues() {
    var initialValuesMap = {
      email: "",
    };

    if (this.props.auth) {
      initialValuesMap = {
        email: this.props.auth.email || "",
      };
    } else {
      initialValuesMap = {
        email: this.props.auth.email || "",
      };
    }

    return initialValuesMap;
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
              email: Yup.string()
                .matches(emailRegex, "Email is invalid")
                .required("Email is required"),
            })}
            onSubmit={async (fields, { setSubmitting }) => {
              setSubmitting(true);
              await this.onFormSubmit(fields);

              setSubmitting(false);
            }}
          >
            {({ errors, status, touched }) => (
              <Form className="d-block mx-auto px-2">
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
                    Change Email
                  </button>
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

export default connect(mapStateToProps, { notifyModal, updateUser })(EmailForm);
