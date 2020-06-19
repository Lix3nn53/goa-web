import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchUser } from "store/actions";
import LoginStrategies from "components/auth/LoginStrategies";
import authAPI from "api/authAPI";

class LoginForm extends Component {
  state = {
    loginError: "",
  };

  async onFormSubmit(fields) {
    const localAuth = await authAPI.localAuth(
      fields.emailOrUsername,
      fields.password
    );

    if (localAuth.success) {
      this.props.history.push("/");
      window.location.reload(false);
    } else {
      this.setState({ loginError: localAuth.errorMessage });
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.props.auth) {
      return <p>You are already logged in</p>;
    }
    return (
      <div>
        <Formik
          className="col"
          initialValues={{ emailOrUsername: "", password: "" }}
          validationSchema={Yup.object().shape({
            emailOrUsername: Yup.string().required(
              "Email or username is required"
            ),
            password: Yup.string().required("password is required"),
          })}
          onSubmit={async (fields, { setSubmitting }) => {
            setSubmitting(true);
            await this.onFormSubmit(fields);

            setSubmitting(false);
          }}
        >
          {({ errors, status, touched, isSubmitting }) => (
            <Form className="d-block mx-auto px-2">
              <span className="text-danger">{this.state.loginError}</span>
              <div className="form-row">
                <div className="form-group col" key="title">
                  <label htmlFor="emailOrUsername">Email or username</label>
                  <Field
                    name="emailOrUsername"
                    type="text"
                    className={
                      "form-control" +
                      (errors.emailOrUsername && touched.emailOrUsername
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="Email or username"
                  />
                  <ErrorMessage
                    name="emailOrUsername"
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
              </div>

              <div className="text-right" key="buttons">
                <button
                  className="btn btn-primary"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <hr />
        <LoginStrategies />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(withRouter(LoginForm));
