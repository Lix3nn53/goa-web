import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import { emailRegex, usernameRegex, passwordRegex } from "assets/regex";
import { fetchUser } from "actions";
import LoginStrategies from "components/auth/LoginStrategies";
import authAPI from "api/authAPI";

class RegisterForm extends Component {
  state = {
    errorMessage: "",
  };

  async onFormSubmit(fields) {
    this.hideRegisterModal();

    const res = authAPI.localAuthRegister(
      fields.email,
      fields.username,
      fields.password,
      fields.passwordConfirm
    );

    if (res.success) {
      this.props.fetchUser();
      this.props.history.push("/");
    } else {
      this.props.history.push("/register");
      this.setState({ errorMessage: res.errorMessage });
    }
  }

  hideRegisterModal() {
    $("#registerModal").modal("hide");
  }

  equalTo(ref, msg) {
    return Yup.mixed().test({
      name: "equalTo",
      exclusive: false,
      message: msg,
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  render() {
    if (this.props.auth) {
      return <p>You are already logged in</p>;
    }

    Yup.addMethod(Yup.string, "equalTo", this.equalTo);

    return (
      <>
        <Formik
          className="col"
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .matches(emailRegex, "Email must be a valid email")
              .required("Email is required"),
            username: Yup.string()
              .min(4)
              .max(16)
              .matches(
                usernameRegex,
                "Username can't contain special characters"
              )
              .required("Username is required"),
            password: Yup.string()
              .min(6)
              .max(16)
              .matches(
                passwordRegex,
                "Password must contain at least one letter and one number"
              )
              .required("Password is required"),
            passwordConfirm: Yup.string()
              .equalTo(Yup.ref("password"), "Passwords must match")
              .required("Required"),
          })}
          onSubmit={async (fields, { setSubmitting }) => {
            await this.onFormSubmit(fields);

            setTimeout(() => {
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ errors, status, touched, isSubmitting }) => (
            <Form className="d-block mx-auto px-2">
              <span className="text-danger">{this.state.errorMessage}</span>
              <div className="form-row">
                <div className="form-group col" key="email">
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
              </div>
              <div className="form-row">
                <div className="form-group col" key="username">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className={
                      "form-control" +
                      (errors.username && touched.username ? " is-invalid" : "")
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

              <div className="form-row">
                <div className="form-group col" key="password">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    className="invalid-feedback"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>

                <div className="form-group col" key="passwordConfirm">
                  <label htmlFor="passwordConfirm">Repeat password</label>
                  <Field
                    name="passwordConfirm"
                    type="password"
                    className={
                      "form-control" +
                      (errors.passwordConfirm && touched.passwordConfirm
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="Repeat password"
                  />
                  <ErrorMessage
                    name="passwordConfirm"
                    className="invalid-feedback"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />
                </div>
              </div>

              <div className="text-right" key="buttons">
                <button
                  className="btn btn-primary"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <hr />
        <LoginStrategies />
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(
  withRouter(RegisterForm)
);
