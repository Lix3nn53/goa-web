//Shows CreditSelection and BillingForm and CardForm
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreditSelection from "components/credits/CreditSelection";
import BillingForm from "components/forms/BillingForm";
import ProfileForm from "components/forms/ProfileForm";
import CardForm from "components/credits/CardForm";
import IyzipayModal from "components/credits/IyzipayModal";
import HorizontalStepper from "components/util/HorizontalStepper";

import storeAPI from "api/storeAPI";

import $ from "jquery";

function AddCreditPage(props) {
  const [formStage, setFormStage] = useState(0);
  const [formValues, setFormValues] = useState(null);
  const [iyzipayHtml, setIyzipayHtml] = useState("Please wait...");

  const auth = useSelector((state) => state.auth);

  const startIyzipay = async (fieldsToCopy) => {
    const fields = Object.assign({}, fieldsToCopy);

    var expireYear = parseInt(fields.expireYear);
    expireYear += 2000;
    fields.expireYear = expireYear;

    var names = fields.cardHolderName.split(" ");
    const surname = names[names.length - 1];
    names.pop();
    const name = names.join(" ");

    const creditSelection = formValues.creditSelection;
    const product = storeAPI.product(
      creditSelection.category,
      creditSelection.description,
      creditSelection.icon,
      creditSelection.name,
      creditSelection.price,
      creditSelection.productId
    );

    const identityNumber = "11111111111";
    const registrationAddress = formValues.city + "/" + formValues.country;

    const buyer = storeAPI.buyer(
      auth._id,
      formValues.username,
      identityNumber,
      formValues.email,
      registrationAddress,
      formValues.city,
      formValues.country,
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

    setIyzipayHtml(iyzipayHtml);
  };

  const renderContent = () => {
    if (formStage === 3) {
      return (
        <div>
          <CardForm
            formValues={formValues}
            onCancel={() => {
              setFormStage(2);
            }}
            onFormSubmit={(fieldsToCopy) => {
              $("#iyzipayModal").modal("show");
              startIyzipay(fieldsToCopy);
            }}
          />
          <IyzipayModal iyzipayHtml={iyzipayHtml} />
        </div>
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
