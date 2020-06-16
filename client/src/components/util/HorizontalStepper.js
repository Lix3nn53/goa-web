import React from "react";
import PropTypes from "prop-types";

function HorizontalStepper(props) {
  const { stages, currentStage } = props;

  const renderStages = () => {
    var steps = [];

    for (var i = 0; i < stages.length; i++) {
      if (i < currentStage) {
        steps[i] = (
          <div key={i} className="col mdl-stepper-step step-done">
            <div className="mdl-stepper-circle">
              <span>{i + 1}</span>
            </div>
            <div className="mdl-stepper-title">{stages[i].title}</div>
            {stages[i].optional ? (
              <div className="mdl-stepper-optional">{stages[i].optional}</div>
            ) : (
              ""
            )}
            <div className="mdl-stepper-bar-left"></div>
            <div className="mdl-stepper-bar-right"></div>
          </div>
        );
      } else if (i > currentStage) {
        steps[i] = (
          <div key={i} className="col mdl-stepper-step">
            <div className="mdl-stepper-circle">
              <span>{i + 1}</span>
            </div>
            <div className="mdl-stepper-title">{stages[i].title}</div>
            {stages[i].optional ? (
              <div className="mdl-stepper-optional">{stages[i].optional}</div>
            ) : (
              ""
            )}
            <div className="mdl-stepper-bar-left"></div>
            <div className="mdl-stepper-bar-right"></div>
          </div>
        );
      } else {
        steps[i] = (
          <div key={i} className="col mdl-stepper-step active-step">
            <div className="mdl-stepper-circle">
              <span>{i + 1}</span>
            </div>
            <div className="mdl-stepper-title">{stages[i].title}</div>
            {stages[i].optional ? (
              <div className="mdl-stepper-optional">{stages[i].optional}</div>
            ) : (
              ""
            )}
            <div className="mdl-stepper-bar-left"></div>
            <div className="mdl-stepper-bar-right"></div>
          </div>
        );
      }
    }

    return steps;
  };

  return (
    <div className="container">
      <div className="mdl-card__supporting-text">
        <div className="row mdl-stepper-horizontal-alternative">
          {renderStages()}
        </div>
      </div>
    </div>
  );
}

export default HorizontalStepper;

HorizontalStepper.propTypes = {
  stages: PropTypes.array.isRequired,
  currentStage: PropTypes.number.isRequired,
};
