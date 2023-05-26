import React, { Component } from "react";

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  onClickStepButton = (activeStep) => {
    this.setState({
      currentStep: activeStep,
    });
  };

  setActiveStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  createStepLine = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-button ${
              currentStep === i ? "active" : ""
            }`}
            onClick={(e) => this.onClickStepButton(i)}
          >
            {step.name}
          </div>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-component ${
              currentStep === i ? "" : "d-none"
            }`}
          >
            {step.component()}
          </div>
        );
      }
    }
    return retData;
  };

  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    return (
      <>
        <div className="new-account-tab-container">
          <div className="row row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="wizard-tab-line-container">
                {this.createStepLine()}
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="wizard-step-component-container">
                {this.createStepContainer()}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center ">
          {currentStep < steps.length - 1 && (
            <button
              onClick={(e) => this.onClickStepButton(currentStep - 1)}
              className="asset-blue-button m-b-0"
            >
              Previous
            </button>
          )}
          {currentStep >= steps.length + 1 && (
            <button className="asset-blue-button m-b-0">Previous</button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={(e) => this.onClickStepButton(currentStep + 1)}
              className="asset-blue-button m-r-0 m-b-0"
            >
              Next
            </button>
          )}
          {currentStep >= steps.length - 1 && (
            <button
              onClick={this.props.submitPage}
              className="asset-blue-button m-r-0 m-b-0"
            >
              Submit
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Wizard;