import React from "react";
import SelectResourcePopup from "./SelectResourcePopup";
import AddConditionPopup from "./AddConditionPopup";
import AddActionPopup from "./AddActionPopup";

class CreateRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectResourceModalRef = React.createRef();
    this.addConditionRef = React.createRef();
    this.addActionRef = React.createRef();
  }

  onClickSelectResource = (e) => {
    this.selectResourceModalRef.current.toggle();
  };

  onClickAddCondition = (e) => {
    this.addConditionRef.current.toggle();
  };

  onClickAddAction = (e) => {
    this.addActionRef.current.toggle();
  };

  render() {
    return (
      <div className="create-rule-container">
        <div className="alert-page-container">
          <div className="common-container">
            <a className="asset-white-button">
              <i className="fa fa-plus"></i>&nbsp;&nbsp; New Alert Rule
            </a>
            <a className="asset-white-button">
              <i className="fa fa-play-circle"></i>&nbsp;&nbsp; Enable
            </a>
            <a className="asset-white-button">
              <i className="fa fa-stop-circle"></i>&nbsp;&nbsp; Disable
            </a>
            <a className="asset-white-button">
              <i className="fa fa-refresh"></i>&nbsp;&nbsp; Refresh
            </a>
            <a className="asset-white-button">
              <i className="fa-regular fa-trash-can"></i>&nbsp;&nbsp; Delete
            </a>
          </div>
          <div className="common-container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="create-rule-header-container">
                  <div className="create-rule-header-image">
                    <i className="fa fa-desktop"></i>
                  </div>
                  <div className="create-rule-header-text">
                    <span style={{ color: "red", marginRight: "10px" }}>*</span>
                    <span>SELECT RESOURCES</span>
                  </div>
                </div>
                <div className="create-rule-header-content">
                  <div className="italic-label">
                    Select the target(s) you wish to monitor
                  </div>
                  <div>
                    <button
                      className="asset-blue-button"
                      onClick={this.onClickSelectResource}
                    >
                      Select Resource
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="create-rule-header-container">
                  <div className="create-rule-header-image">
                    <i className="fa fa-file-o"></i>
                  </div>
                  <div className="create-rule-header-text">
                    <span style={{ color: "red", marginRight: "10px" }}>*</span>
                    <span>CONDITION</span>
                  </div>
                </div>
                <div className="create-rule-header-content">
                  <div className="italic-label">
                    No condition is selected. Click on 'Add' to select a signal
                    and define its logic.
                  </div>
                  <div>
                    <button
                      className="asset-blue-button"
                      onClick={this.onClickAddCondition}
                    >
                      Add Condition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="create-rule-header-container">
                  <div className="create-rule-header-image">
                    <i className="fa fa-android"></i>
                  </div>
                  <div className="create-rule-header-text">
                    <span>ACTION GROUPS (Optional)</span>
                  </div>
                </div>
                <div className="create-rule-header-content">
                  <div className="italic-label">No action group selected</div>
                  <div>
                    <button className="asset-gray-button m-r-2 m-b-1">Add</button>
                    <button className="asset-gray-button m-b-1">Create</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="create-rule-header-container">
                  <div className="create-rule-header-image">
                    <i className="fa fa-file-text"></i>
                  </div>
                  <div className="create-rule-header-text">
                    <span>ALERT DETAILS</span>
                  </div>
                </div>
                <div className="create-rule-header-content">
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="filter-control-group col-md-6 col-sm-12 p-l-0 p-r-0 m-r-2">
                      <label htmlFor="ruleName" className="">
                        Alert Rule Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ruleName"
                      />
                    </div>
                    <div className="filter-control-group col-md-6 col-sm-12 p-l-0 p-r-0">
                      <label htmlFor="description" className="">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                      ></textarea>
                    </div>
                  </div>
                  <div className="m-t-1">
                    <button className="asset-gray-button m-r-2 m-b-1">
                      Save &amp; enable
                    </button>
                    <button className="asset-gray-button m-b-1">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container">
            <button className="asset-gray-button">Create Alert Rule</button>
          </div>
        </div>
        <SelectResourcePopup ref={this.selectResourceModalRef} />
        <AddConditionPopup ref={this.addConditionRef} />
        <AddActionPopup ref={this.addActionRef} />
      </div>
    );
  }
}

export default CreateRule;