import React, { useState } from "react";
import ProductConfirmation from "components/store/ProductConfirmation";
import ProductSelection from "components/store/ProductSelection";
import MinecraftForm from "components/forms/MinecraftForm";
import HorizontalStepper from "components/util/HorizontalStepper";

function StorePage(props) {
  const [formStage, setFormStage] = useState(0);
  const [formValues, setFormValues] = useState(null);

  const renderCurrentStage = () => {
    if (formStage === 2) {
      return (
        <ProductConfirmation
          formValues={formValues}
          onCancel={() => {
            setFormStage(1);
          }}
        />
      );
    }

    if (formStage === 1) {
      return (
        <div className="container">
          <p className="text-danger text-center">
            You must have joined the server at least once with this username
          </p>
          <MinecraftForm
            formValues={formValues}
            onFormSubmit={(fields) => {
              formValues.minecraftUsername = fields.minecraftUsername;
              setFormStage(2);
              setFormValues(formValues);
            }}
            onCancel={() => {
              setFormStage(0);
            }}
          />
        </div>
      );
    }

    //if (formStage === 0)
    return (
      <ProductSelection
        formValues={formValues}
        onFormSubmit={(productSelection) => {
          setFormValues({ productSelection: productSelection });
          setFormStage(1);
        }}
      />
    );
  };

  const renderContent = () => {
    return <div className="store">{renderCurrentStage()}</div>;
  };

  return (
    <div>
      <HorizontalStepper
        currentStage={formStage}
        stages={[
          { title: "Select Product", optional: "" },
          { title: "Minecraft Username", optional: "" },
          { title: "Confirm Purchase", optional: "" },
        ]}
      />

      {renderContent()}
    </div>
  );
}

export default StorePage;
