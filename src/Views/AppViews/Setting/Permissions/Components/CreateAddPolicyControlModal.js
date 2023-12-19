import { Box, Grid, Checkbox, ListItem, IconButton } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { getPolicies,updateRole,getRoleById } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
class CreateAddPolicyControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: [],
      selectedPolicy: [],
    };
  }

  componentDidMount = () => {
    this.props.getPolicies();
    this.getSelectedPoliciesFromProps();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allPolicy.status !== prevProps.allPolicy.status) {
      if (this.props.allPolicy.status === status.SUCCESS) {
        let policies = this.props.allPolicy.data;
        if (policies) {
          this.setState({ policies });
        }
      }
    }

    if (this.props.selectedPolicies !== prevProps.selectedPolicies) {
      this.getSelectedPoliciesFromProps();
    }

    if (this.props.roleUpdation.status !== prevProps.roleUpdation.status) {
      if (this.props.roleUpdation.status === status.SUCCESS) {
        if (this.props.roleUpdation.data) {
          ToastMessage.success(`Policies Updated Successfully`);
          let { roleId } = this.getRoleDetailsFromUrl();
          this.props.getRoleById(roleId);
        } else {
          ToastMessage.error(`Policies Updation Failed!`);
        }
      }
    }
  };

  // Render modal header
  renderModalHeader = () => {
    return (
      <ModalHeader tag="div">
        <h5>
          Choose Policy
          <IconButton
            onClick={this.props.handleCreateAddPolicyControlModal}
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </h5>
      </ModalHeader>
    );
  };

  // Render modal body
  renderModalBody = () => {
    let { searchedPolicy, policies } = this.state;
    let { allPolicy, roleUpdation } = this.props;

    let updatePoliciesStatus = roleUpdation?.status === status.IN_PROGRESS;
    return (
      <ModalBody>
        <Box className="setting-common-searchbar p-t-5 p-b-0">
          <Grid container>
            <Grid item xs={12}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search policy"
                  value={searchedPolicy}
                  onChange={this.handleSearchChange}
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className="setting-common-searchbar">
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              <h5 className="m-b-0 m-t-0">
                List of Policies ({policies.length})
              </h5>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <LoadingButton
                    className="primary-btn min-width-inherit"
                    variant="contained"
                    onClick={this.onClickUpdatePolicies}
                    disabled={updatePoliciesStatus}
                    loading={updatePoliciesStatus}
                  >
                    Update Policies
                  </LoadingButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        <Box className="policy-boxs">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allPolicy.status === status.IN_PROGRESS
              ? this.renderLoder()
              : this.renderPolicies()}
          </Grid>
        </Box>
      </ModalBody>
    );
  };

  //  Serach policy
  handleSearchChange = (e) => {
    let value = e.target.value;
    let data = this.props.allPolicy?.data || [];

    let { policies, searchedPolicy } = this.state;

    if (data?.length) {
      searchedPolicy = value;
      if (value) {
        policies = [];
        data.forEach((row) => {
          let permissions = row.permissions;

          if (row?.name.toLowerCase().includes(value.toLowerCase())) {
            policies.push(row);
          } else if (permissions.length) {
            let searchPermissionData = [];
            permissions.forEach((permisson) => {
              let findValue = `${permisson?.id || permisson?.name}`;
              if (
                findValue &&
                findValue.toLowerCase().includes(value.toLowerCase())
              ) {
                searchPermissionData.push(permisson);
              }
            });
            if (searchPermissionData.length) {
              policies.push({ ...row, permissions: searchPermissionData });
            }
          } else {
            return null;
          }
        });
      } else {
        policies = data;
      }

      this.setState({ policies, searchedPolicy });
    }
  };

  // Render policies
  renderPolicies = () => {
    let { policies, selectedPolicy } = this.state;
    return policies?.length
      ? policies.map((policy) => (
          <Grid item xs={4} key={v4()}>
            <Box className="policy-box">
              <Box className="head">
                <Box className="title">{policy.name}</Box>
                <Box className="d-inline-block">
                  <Checkbox
                    className="check-box"
                    size="small"
                    id={`${policy.id}`}
                    checked={selectedPolicy.includes(policy.id)}
                    onChange={this.handleCheckBox}
                  />
                </Box>
              </Box>

              <Box className="policy-list-content">
                {policy.permissions?.length ? (
                  <>
                    <Box className="title">list of permissons</Box>
                    <List>
                      {policy.permissions.map((permisson) => (
                        <ListItem key={v4()}>{permisson.id}</ListItem>
                      ))}
                    </List>
                  </>
                ) : (
                  this.renderNoDataHtml("No permission Found.")
                )}
              </Box>
            </Box>
          </Grid>
        ))
      : this.renderNoDataHtml("There are no policy available.");
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedPolicy } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedPolicy.push(+id);
    } else {
      selectedPolicy = selectedPolicy.filter((value) => value !== +id);
    }

    this.setState({ selectedPolicy });
  };

  // Render loder
  renderLoder = () => {
    return (
      <Grid item xs={12}>
        <Box className="d-blck text-center w-100 h-100 ">
          <Loader className="text-center w-100 h-100 p-t-20 p-b-20" />
        </Box>
      </Grid>
    );
  };

  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };

  // Get Selected Policies from props
  getSelectedPoliciesFromProps = () => {
    let policies = this.props.selectedPolicies;

    if (policies?.length) {
      let { selectedPolicy } = this.state;
      selectedPolicy = policies.map((policy) => policy.id);

      this.setState({ selectedPolicy });
    }
  };

  getRoleDetailsFromUrl = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const roleId = queryPrm.get("roleId");
    return { roleId };
  };

  onClickUpdatePolicies = () => {
    let { roleId: id } = this.getRoleDetailsFromUrl();
    let { selectedPolicy } = this.state;
    if (!selectedPolicy.length) {
      ToastMessage.error("Please select policies");
    } else {
      let params = {
        id,
        policies: selectedPolicy.map((policy) => ({ id: policy })),
      };
      this.props.updateRole(params);
    }
  };


  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateAddPolicyControlModal}
        className="add-policy-modal-container"
      >
        {this.renderModalHeader()}
        {this.renderModalBody()}
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  const { allPolicy, roleUpdation } = state.settings;
  return {
    allPolicy,
    roleUpdation,
  };
};

const mapDispatchToProps = {
  getPolicies,
  updateRole,getRoleById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAddPolicyControlModal);
