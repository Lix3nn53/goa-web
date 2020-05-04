//Shows CreditSelection and BillingForm and CardForm
import React, { Component } from "react";
import CreditSelection from "components/credits/CreditSelection";
import BillingForm from "components/forms/BillingForm";
import ProfileForm from "components/forms/ProfileForm";
import CardForm from "components/credits/CardForm";
import HorizontalStepper from "components/util/HorizontalStepper";

class AddCreditPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    const formValues = {};

    this.state = Object.assign({ formStage: 0 }, { formValues });
  }

  renderContent() {
    if (this.state.formStage === 3) {
      return (
        <CardForm
          formValues={this.state.formValues}
          onCancel={() => {
            this.setState({ formStage: 2 });
            this.gotoPreviousStage();
          }}
        />
      );
    }

    if (this.state.formStage === 2) {
      return (
        <BillingForm
          formValues={this.state.formValues}
          onCancel={() => {
            this.setState({ formStage: 1 });
            this.gotoPreviousStage();
          }}
          onFormSubmit={(fields) => {
            const formValues = Object.assign(this.state.formValues, fields);
            this.setState(Object.assign({ formStage: 3 }, { formValues }));
            this.gotoNextStage();
          }}
        />
      );
    }

    if (this.state.formStage === 1) {
      return (
        <ProfileForm
          formValues={this.state.formValues}
          onCancel={() => {
            this.setState({ formStage: 0 });
            this.gotoPreviousStage();
          }}
          onFormSubmit={(fields) => {
            const formValues = Object.assign(this.state.formValues, fields);
            this.setState(Object.assign({ formStage: 2 }, { formValues }));
            this.gotoNextStage();
          }}
        />
      );
    }

    //if (this.state.formStage === 0)
    return (
      <CreditSelection
        formValues={this.state.formValues}
        onFormSubmit={(creditSelection) => {
          const formValues = this.state.formValues;
          formValues.creditSelection = creditSelection;
          this.setState(Object.assign({ formStage: 1 }, { formValues }));
          this.gotoNextStage();
        }}
      />
    );
  }

  gotoNextStage() {
    this.refs.horizontalStepper.gotoNextStage();
  }

  gotoPreviousStage() {
    this.refs.horizontalStepper.gotoPreviousStage();
  }

  render() {
    return (
      <div>
        <HorizontalStepper
          ref="horizontalStepper"
          stages={[
            { title: "Select Credit", optional: "" },
            { title: "Profile", optional: "" },
            { title: "Billing Info", optional: "" },
            { title: "Payment", optional: "" },
          ]}
        />

        {this.renderContent()}
      </div>
    );
  }
}

export default AddCreditPage;
