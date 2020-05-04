import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import CreditSelectionCard from "./CreditSelectionCard";
import storeAPI from "api/storeAPI";

class CardForm extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = { iyzipayHtml: "" };
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  async onFormSubmit(fieldsToCopy) {
    $("#paymentModal").modal("show");
    const fields = Object.assign({}, fieldsToCopy);

    var expireYear = parseInt(fields.expireYear);
    expireYear += 2000;
    fields.expireYear = expireYear;

    var names = fields.cardHolderName.split(" ");
    const surname = names[names.length - 1];
    names.pop();
    const name = names.join(" ");

    const creditSelection = this.props.formValues.creditSelection;
    const product = storeAPI.product(
      creditSelection.category,
      creditSelection.description,
      creditSelection.icon,
      creditSelection.name,
      creditSelection.price,
      creditSelection.productId
    );

    const identityNumber = "11111111111";
    const registrationAddress =
      this.props.formValues.city + "/" + this.props.formValues.country;

    const buyer = storeAPI.buyer(
      this.props.auth._id,
      this.props.formValues.username,
      identityNumber,
      this.props.formValues.email,
      registrationAddress,
      this.props.formValues.city,
      this.props.formValues.country,
      name,
      surname
    );

    const paymentCard = storeAPI.paymentCard(
      fields.cardHolderName,
      fields.cardNumber,
      fields.cvc,
      fields.expireMonth,
      fields.expireYear,
      0
    );

    const iyzipayHtml = await storeAPI.startIyzipay3D(
      buyer,
      paymentCard,
      product
    );

    this.setState({ iyzipayHtml });
  }

  render() {
    return (
      <div className="container-fluid w-75">
        <div className="row">
          <Formik
            className="col"
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
            onSubmit={async (fields) => {
              await this.onFormSubmit(fields);
            }}
          >
            {({ errors, status, touched }) => (
              <Form className="d-block mx-auto px-2">
                <div className="form-row">
                  <div className="form-group col" key="cardHolderName">
                    <label htmlFor="cardHolderName">Name on card</label>
                    <Field
                      name="cardHolderName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.cardHolderName && touched.cardHolderName
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Name on card"
                    />
                    <ErrorMessage
                      name="cardHolderName"
                      className="invalid-feedback"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>

                  <div className="form-group col-md-2" key="expireMonth">
                    <label htmlFor="expireMonth">Month</label>
                    <Field
                      name="expireMonth"
                      type="text"
                      className={
                        "form-control" +
                        (errors.expireMonth && touched.expireMonth
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="MM"
                    />
                    <ErrorMessage
                      name="expireMonth"
                      className="invalid-feedback"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>

                  <div className="form-group col-md-2" key="expireYear">
                    <label htmlFor="expireYear">Year</label>
                    <Field
                      name="expireYear"
                      type="text"
                      className={
                        "form-control" +
                        (errors.expireYear && touched.expireYear
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="YY"
                    />
                    <ErrorMessage
                      name="expireYear"
                      className="invalid-feedback"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col" key="cardNumber">
                    <label htmlFor="cardNumber">Card number</label>
                    <Field
                      name="cardNumber"
                      type="text"
                      className={
                        "form-control" +
                        (errors.cardNumber && touched.cardNumber
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Card number"
                    />
                    <ErrorMessage
                      name="cardNumber"
                      className="invalid-feedback"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="form-group col-md-2" key="cvc">
                    <label htmlFor="cvc">Security</label>
                    <div className="input-group">
                      <Field
                        name="cvc"
                        type="text"
                        className={
                          "form-control" +
                          (errors.cvc && touched.cvc ? " is-invalid" : "")
                        }
                        placeholder="cvc"
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Three-digits code on the back of your card"
                        >
                          <FontAwesomeIcon
                            size="xs"
                            mask={["fas"]}
                            icon={faQuestionCircle}
                          />
                        </span>
                      </div>
                      <ErrorMessage
                        name="cvc"
                        className="invalid-feedback"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                  </div>
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
                  <button
                    className="btn btn-secondary float-left"
                    variant="secondary"
                    onClick={this.props.onCancel}
                  >
                    Back
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <CreditSelectionCard
            className="col"
            creditSelection={{
              productId: this.props.formValues.creditSelection.productId,
              price: this.props.formValues.creditSelection.price,
              name: this.props.formValues.creditSelection.name,
              description: this.props.formValues.creditSelection.description,
              category: this.props.formValues.creditSelection.category,
              icon: this.props.formValues.creditSelection.icon,
            }}
          />
        </div>

        <div
          className="modal fade"
          id="paymentModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="paymentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body embed-responsive embed-responsive-16by9">
                <iframe
                  title="paymentFrame"
                  className="embed-responsive-item"
                  src={"data:text/html;charset=utf-8," + this.state.iyzipayHtml}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withRouter(CardForm));
