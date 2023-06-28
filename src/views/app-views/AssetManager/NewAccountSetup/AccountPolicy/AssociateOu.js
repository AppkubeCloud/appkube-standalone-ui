import React, { Component } from "react";
import SelectExisting from "../../../../../assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "../../../../../assets/img/assetmanager/create-file-icon.png";
import AssociatedAccountPopup from "../../Components/AssociatedAccountPopup";
import CreateNewOuPopup from "../../Components/CreateNewOuPopup";
import SelectAccountPopup from "../../Components/SelectAccountPopup";
import CreateNewAccountPopup from "../../Components/CreateNewAccountPopup";
import config from "../../../config";
import { RestService } from "./../../../Services/RestService";
import { getCurrentOrgId } from "utils";
import Button from '@mui/material/Button';

class AssociateOu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      checkedId: false,
      isDepartmentCreated: false,
      name: "",
      description: "",
      selectAccountPopupShow: false,
      createNewOuPopupShow: false,
    };
  }

  componentDidMount() {
    this.getDepartMents();
  }

  getDepartMents() {
    let organizationId = 1;
    if (getCurrentOrgId()) {
      organizationId = getCurrentOrgId();
    }
    try {
      RestService.getData(config.GET_ALL_ORGS, null, null).then((response) => {
        this.setState({ departments: response });
      });
    } catch (error) {
      console.log(error);
    }
  }

  newDepartmentAppend = (department, description) => {
    this.setState({
      departments: [department].concat(this.state.departments),
      checkedId: department.id,
      isDepartmentCreated: true,
      name: department.name,
      description: description,
    });
    this.props.setDepartment(department.id, department.name, description);
  };

  getDepartmentName = (id) => {
    return this.state.departments.filter(
      (department) => department.id === id
    )[0].name;
  };

  toggleSelectAccountPopup = (clear) => {
    if (clear) {
      this.setState({
        name: "",
        description: "",
        isDepartmentCreated: false,
        checkedId: false,
      });
    }
    this.setState({
      selectAccountPopupShow: !this.state.selectAccountPopupShow,
    });
  };

  toggleCreateNewOuPopup = () => {
    this.setState({
      createNewOuPopupShow: !this.state.createNewOuPopupShow,
    });
  };

  render() {
    const { selectAccountPopupShow, createNewOuPopupShow } = this.state;
    return (
      <>
        {!this.state.isDepartmentCreated && !this.state.checkedId ? (
          <div className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Associate OU</h3>
            <p>
              Select Organizational Unit to Associate with Cloud Account Or
              Create new
            </p>
            <div className="organizational-box">
              <div className="organizational-inner-boxs">
                <div
                  className="select-organizational"
                  onClick={() => this.toggleSelectAccountPopup()}
                >
                  <div className="organizational-image">
                    <img src={SelectExisting} alt="" />
                  </div>
                  <div className="organizational-title">
                    Select From Existing OU
                  </div>
                </div>
                <div
                  className="select-organizational"
                  onClick={() => this.toggleCreateNewOuPopup()}
                >
                  <div className="organizational-image">
                    <img src={CreateFileIcon} alt="" />
                  </div>
                  <div className="organizational-title">Create New OU</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Great Job!!</h3>
            <p>
              Selected Organizational Unit
              <strong> {this.props.roleDetails.departmentName}</strong>. All you
              need to do <br /> now is click on that{" "}
              <strong>"Finished" </strong>
              button to move forward with the next step.
            </p>
            <div className="associate-box">
              <h3>Associate OU</h3>
              <div className="contents">
                <label>Name</label>
                <p>{this.props.roleDetails.departmentName}</p>
              </div>
              <div className="contents">
                <label>Description</label>
                <p>{this.state.description}</p>
              </div>
              <div
                className="d-flex width-100 align-items-center"
                style={{ justifyContent: "space-between" }}
              >
                <button onClick={() => this.toggleSelectAccountPopup()}>
                  Change OU
                </button>
                <Button
                  className="primary-btn min-width"
                  style={{ textDecoration: "none" }}
                  onClick={() => this.toggleCreateNewOuPopup()}
                >
                  Create OU
                </Button>
              </div>
            </div>
          </div>
        )}
        <AssociatedAccountPopup
          addModalOpen={() => {
            this.toggleSelectAccountPopup();
          }}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        {createNewOuPopupShow ? (
          <CreateNewOuPopup
            toggleCreateNewOuPopupShow={this.state.createNewOuPopupShow}
            toggleCreateNewOuPopup={() => {
              this.toggleCreateNewOuPopup();
            }}
            newDepartmentAppend={this.newDepartmentAppend}
          />
        ) : (
          <></>
        )}
        {selectAccountPopupShow ? (
          <SelectAccountPopup
            selectAccountPopupShow={this.state.selectAccountPopupShow}
            toggleSelectAccountPopup={this.toggleSelectAccountPopup}
            checkedId={this.state.checkedId}
            setID={(checkedId) => {
              this.setState({ checkedId });
              this.props.setDepartment(
                checkedId,
                checkedId ? this.getDepartmentName(checkedId) : ""
              );
            }}
          />
        ) : (
          <></>
        )}

        <CreateNewAccountPopup
          departments={this.state.departments}
          newDepartmentAppend={this.newDepartmentAppend}
          checkedId={this.state.checkedId}
          setID={(checkedId) => {
            this.setState({ checkedId });
            this.props.setDepartment(
              checkedId,
              checkedId ? this.getDepartmentName(checkedId) : ""
            );
          }}
        />
      </>
    );
  }
}

export default AssociateOu;
