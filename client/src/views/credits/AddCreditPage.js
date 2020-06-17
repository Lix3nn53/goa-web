//Shows CreditSelection and BillingForm and CardForm
import React, { useState } from "react";
import CreditSelection from "components/credits/CreditSelection";
import BillingForm from "components/forms/BillingForm";
import ProfileForm from "components/forms/ProfileForm";
import CardForm from "components/credits/CardForm";
import HorizontalStepper from "components/util/HorizontalStepper";

function AddCreditPage(props) {
  const [formStage, setFormStage] = useState(0);
  const [formValues, setFormValues] = useState(null);

  const renderContent = () => {
    if (formStage === 3) {
      return (
        <CardForm
          formValues={formValues}
          onCancel={() => {
            setFormStage(2);
          }}
        />
      );
    }

    if (formStage === 2) {
      return (
        <BillingForm
          formValues={formValues}
          onCancel={() => {
            setFormStage(1);
          }}
          onFormSubmit={(fields) => {
            setFormValues({ ...formValues, ...fields });
            setFormStage(3);
          }}
        />
      );
    }

    if (formStage === 1) {
      return (
        <ProfileForm
          formValues={formValues}
          onCancel={() => {
            setFormStage(0);
          }}
          onFormSubmit={(fields) => {
            setFormValues({ ...formValues, ...fields });
            setFormStage(2);
          }}
        />
      );
    }

    //if (this.state.formStage === 0)
    return (
      <CreditSelection
        formValues={formValues}
        onFormSubmit={(creditSelection) => {
          setFormValues({ creditSelection: creditSelection });
          setFormStage(1);
        }}
      />
    );
  };

  return (
    <div>
      <HorizontalStepper
        currentStage={formStage}
        stages={[
          { title: "Select Credit", optional: "" },
          { title: "Profile", optional: "" },
          { title: "Billing Info", optional: "" },
          { title: "Payment", optional: "" },
        ]}
      />

      {renderContent()}
    </div>
  );
}

export default AddCreditPage;
