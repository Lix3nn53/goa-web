import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
import { fetchUser } from "actions";

class LoginForm extends Component {
  state = {
    loginError: ""
  };

  async onFormSubmit(fields) {
    try {
      const res = await axios.post("/auth/local", fields);

      this.hideLoginModal();

      console.log("1");
      console.log(res.data.message);
      console.log(res.data);
      this.setState({ loginError: res.data.message });
      if (res.data.success) {
        this.props.fetchUser();
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
      }
    } catch (error) {
      console.log("2");
      if (error.response && error.response.data) {
        console.log(error.response.data);
        this.setState({ loginError: error.response.data.message });
      }
      this.hideLoginModal();
      this.props.history.push("/login");
    }
  }

  hideLoginModal() {
    $("#loginModal").modal("hide");
  }

  render() {
    if (this.props.auth) {
      return <p>You are already logged in</p>;
    }
    return (
      <>
        <Formik
          className="col"
          initialValues={{ emailOrUsername: "", password: "" }}
          validationSchema={Yup.object().shape({
            emailOrUsername: Yup.string().required(
              "Email or username is required"
            ),
            password: Yup.string().required("password is required")
          })}
          onSubmit={async (fields, { setSubmitting }) => {
            await this.onFormSubmit(fields);

            setTimeout(() => {
              setSubmitting(false);
            }, 2000);
          }}
          render={({ errors, status, touched, isSubmitting }) => (
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
                    render={msg => <div className="text-danger">{msg}</div>}
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
                    render={msg => <div className="text-danger">{msg}</div>}
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
        />
        <hr />
        <div className="row">
          <a
            className="col mx-4 nav-link login login-google"
            href="/auth/google"
          >
            <FontAwesomeIcon className="mr-2" icon={faGoogle} />
            Login with google
          </a>
          <a
            className="col mx-4 nav-link login login-github"
            href="/auth/github"
          >
            <FontAwesomeIcon className="mr-2" icon={faGithub} />
            Login with github
          </a>
        </div>
        <div className="row mt-2">
          <a
            className="col mx-4 nav-link login login-twitter"
            href="/auth/twitter"
          >
            <FontAwesomeIcon className="mr-2" icon={faTwitter} />
            Login with twitter
          </a>
          <a
            className="col mx-4 nav-link login login-facebook"
            href="/auth/facebook"
          >
            <FontAwesomeIcon className="mr-2" icon={faFacebook} />
            Login with facebook
          </a>
        </div>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(withRouter(LoginForm));