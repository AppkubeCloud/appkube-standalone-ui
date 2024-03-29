import React, { Component } from "react";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import SelectExisting from "assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "assets/img/assetmanager/create-file-icon.png";
import AssociatedAccountPopup from "./AssociatedAccountPopup";
import CreateNewOuPopup from "./CreateNewOuPopup";
import SelectAccountPopup from "./SelectAccountPopup";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { Box } from "@mui/material";

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

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments.data
    ) {
      this.setState({
        departments: this.props.organizationWiseDepartments.data.departments,
      });
    }
  };

  newDepartmentAppend = (department, description) => {
    try {
      this.setState({
        departments: [department].concat(this.state.departments),
        checkedId: department.id,
        isDepartmentCreated: true,
        name: department.name,
        description: description,
      });
      this.props.setDepartment(department.id, department.name, description);
    } catch (error) {
      console.error(error);
    }
  };

  getDepartmentName = (id) => {
    return this.state.departments.filter(
      (department) => department.id === Number(id)
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
    const {
      selectAccountPopupShow,
      isDepartmentCreated,
      checkedId,
      description,
      createNewOuPopupShow,
    } = this.state;
    const {
      roleDetails: { departmentName },
    } = this.props;
    return (
      <>
        <Link className="close-btn" to={`${APP_PREFIX_PATH}/environments`}>
          <i className="fa-solid fa-xmark"></i>
        </Link>
        {!isDepartmentCreated && !checkedId ? (
          <Box className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Associate OU</h3>
            <p>
              Select Organizational Unit to Associate with Cloud Account Or
              Create new
            </p>
            <Box className="organizational-box">
              <Box className="organizational-inner-boxs">
                <Box
                  className="select-organizational"
                  onClick={this.toggleSelectAccountPopup}
                >
                  <Box className="organizational-image">
                    <img src={SelectExisting} alt="" />
                  </Box>
                  <div className="organizational-title">
                    Select From Existing OU
                  </div>
                </Box>
                <Box
                  className="select-organizational"
                  onClick={this.toggleCreateNewOuPopup}
                >
                  <Box className="organizational-image">
                    <img src={CreateFileIcon} alt="" />
                  </Box>
                  <div className="organizational-title">Create New OU</div>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Great Job!!</h3>
            <p>
              Selected Organizational Unit
              <strong> {departmentName}</strong>. All you need to do <br /> now
              is click on that
              <strong>"Finished" </strong>
              button to move forward with the next step.
            </p>
            <Box className="associate-box">
              <h3>Associate OU</h3>
              <Box className="contents">
                <label>Name</label>
                <p>{departmentName}</p>
              </Box>
              <Box className="contents">
                <label>Description</label>
                <p>{description}</p>
              </Box>
              <Box
                className="d-flex width-100 align-items-center"
                style={{ justifyContent: "space-between" }}
              >
                <Button
                  className="primary-text-btn min-width"
                  variant="contained"
                  style={{ paddingLeft: 0, textDecoration: "underline" }}
                  onClick={this.toggleSelectAccountPopup}
                >
                  Change ou
                </Button>
                <Button
                  className="primary-btn min-width"
                  variant="contained"
                  onClick={this.toggleCreateNewOuPopup}
                >
                  Create OU
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <AssociatedAccountPopup
          addModalOpen={this.toggleSelectAccountPopup}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        <CreateNewOuPopup
          toggleCreateNewOuPopupShow={createNewOuPopupShow}
          toggleCreateNewOuPopup={this.toggleCreateNewOuPopup}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        {selectAccountPopupShow ? (
          <SelectAccountPopup
            selectAccountPopupShow={selectAccountPopupShow}
            toggleSelectAccountPopup={this.toggleSelectAccountPopup}
            checkedId={checkedId}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { environments } = state;
  return environments;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AssociateOu);
