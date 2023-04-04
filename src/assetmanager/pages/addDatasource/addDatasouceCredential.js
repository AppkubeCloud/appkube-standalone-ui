import React from "react";
import { Link } from "react-router-dom";
import { RestService } from "../_service/RestService";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { CommonService } from "../_common/common";
import AlertMessage from "../../components/AlertMessage";
import masterDummyData from "./masterDatasourceDummy.json";

class AddDatasourceCredential extends React.Component {
  constructor(props) {
    super(props);
    let accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    let serverName = CommonService.getParameterByName(
      "sourceName",
      window.location.href
    );
    let uid = CommonService.getParameterByName("uId", window.location.href);
    this.state = {
      addCredForm: false,
      addcredpopup: false,
      datasourceData: {},
      environmentList: [],
      environment: serverName,
      account: accountId,
      credentialList: [],
      credentialData: {},
      addedDatasourceResponse: {},
      uId: uid,
      isAlertOpen: false,
      message: "",
      severity: "",
      vaultId: null,
      vault: {},
    };
  }

  async componentDidMount() {
    await this.getAccountList();
    RestService.getData(
      `${this.config.GET_ACCOUNT_CREDENTIALS}/${this.state.account}`,
      null,
      null
    ).then((response) => {
      if (response.credentials && response.credentials.length > 0) {
        this.setState({
          credentialList: response.credentials,
        });
      }
    });
  }

  getAccountList = async () => {
    this.manipulateData(masterDummyData);

    // try {
    //   await RestService.getData(
    //     this.config.GET_MASTER_DATASOURCE,
    //     null,
    //     null
    //   ).then((response) => {
    //     this.manipulateData(response);
    //     console.log("Loading Asstes : ", response);
    //   });
    // } catch (err) {
    //   console.log("Loading Asstes failed. Error: ", err);
    // }
  };

  getVault = async (vaultId) => {
    try {
      await RestService.getData(
        `${this.config.VAULT_API}/${vaultId}`,
        null,
        null
      ).then((response) => {
        this.setState({
          vault: response,
        });
      });
    } catch (err) {
      console.log("Loading vault failed. Error: ", err);
    }
  };

  manipulateData = async (data) => {
    let { environmentList, uId, environment } = this.state;
    let dataobj = {};
    let type = "";
    let dsInputType = CommonService.getParameterByName(
      "Id",
      window.location.href
    );
    let accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let datasource = data[i];
        if (data[i].jsonData.name == dsInputType) {
          dataobj = data[i].jsonData;
          type = data[i].cloudType;
        }
        if (environmentList && environmentList.length > 0) {
          if (environmentList.indexOf(datasource.cloudType) === -1) {
            environmentList.push(datasource.cloudType);
          }
        } else {
          environmentList.push(datasource.cloudType);
        }
      }
    }
    if (dataobj && !uId) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      let newInstance = {
        inputType: dataobj.name,
        type: dataobj.id,
        access: "proxy",
        isDefault: false,
        cloudType: type,
        name: dataobj.name + "-" + result,
        accountId: accountId,
      };
      RestService.add(
        `${this.config.GRAFANA_DATASOURCE_API}`,
        newInstance
      ).then((response) => {
        if (response && response.datasource) {
          this.setState({
            uId: response.datasource.uid,
            addedDatasourceResponse: response.datasource,
          });
          this.setState({
            isAlertOpen: true,
            message: response.message,
            severity: "success",
          });
        } else if (response && !response.datasource) {
          this.setState({
            isAlertOpen: true,
            message: response.message,
            severity: "error",
          });
          setTimeout(() => {
            this.props.history.push(
              `/add-data-source?accountId=${accountId}&cloudName=${environment}`
            );
          }, 1000);
        }
      });
    } else {
      RestService.getDashboardList(
        `${this.config.GET_DASHBOARD_WITH_UID}/${uId}`
      ).then((response) => {
        this.setState({
          addedDatasourceResponse: response,
        });
      });
    }
    this.setState({
      datasourceData: dataobj,
      environmentList,
    });
  };

  toggle = () => {
    const { addcredpopup } = this.state;
    this.setState({
      addcredpopup: !addcredpopup,
    });
  };

  onChangeDataSource = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addDataSourceCred = () => {
    this.setState({
      addCredForm: true,
      addcredpopup: false,
    });
  };

  setCred = async (e, credential, v) => {
    await this.getVault(v);
    this.setState({
      credentialData: credential,
      vaultId: v,
    });
  };

  editDataSource = () => {
    const { account, environment, addedDatasourceResponse, uId, vault } =
      this.state;
    let jsonData = { authType: "keys", defaultRegion: `${vault.region}` };
    let secureJson = {
      accessKey: `${vault.accessKey}`,
      secretKey: `${vault.secretKey}`,
    };

    if (addedDatasourceResponse && uId && uId != "") {
      let dataSource = {
        access: "proxy",
        accountID: account,
        basicAuth: false,
        basicAuthPassword: "",
        basicAuthUser: "",
        cloudType: environment,
        database: "",
        id: addedDatasourceResponse.id,
        isDefault: false,
        inputType: addedDatasourceResponse.inputType,
        jsonData: jsonData,
        name: addedDatasourceResponse.name,
        orgId: 1,
        password: "",
        readOnly: false,
        secureJsonFields: {},
        secureJsonData: secureJson,
        tenantID: "",
        type: addedDatasourceResponse.type,
        typeLogoUrl: "",
        uid: uId,
        url: "",
        user: "",
        version: 2,
        withCredentials: false,
      };
      RestService.put(
        `/api/datasources/${addedDatasourceResponse.id}`,
        dataSource
      ).then((response) => {
        if (response && response.datasource) {
          this.setState({
            isAlertOpen: true,
            message: response.message,
            severity: "success",
          });
          setTimeout(() => {
            // getLocationSrv().update({
            //   path: `/a/xformation-assetmanager-ui-plugin/add-data-source-product`,
            // });
          }, 5000);
        } else {
          this.setState({
            isAlertOpen: true,
            message: response.message,
            severity: "error",
          });
        }
      });
    }
  };

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
      message: "",
      severity: "",
    });
  };

  handleStateChange = (e) => {
    const { addedDatasourceResponse } = this.state;
    addedDatasourceResponse["name"] = e.target.value;
    this.setState({
      addedDatasourceResponse,
    });
  };

  render() {
    const {
      addcredpopup,
      addCredForm,
      datasourceData,
      environment,
      account,
      credentialList,
      credentialData,
      isAlertOpen,
      message,
      severity,
      addedDatasourceResponse,
    } = this.state;

    return (
      <div className="add-data-source-container">
        <div className="add-data-source-page-container">
          <div className="data-source-section">
            <div className="source-head">
              <h3>inputs</h3>
              <div className="right-search-bar">
                <div className="back-btn">
                  <Link
                    to={`/assetmanager/pages/add-data-source?accountId=${account}&cloudName=${environment}`}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="far fa-arrow-alt-circle-left" />
                    Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="source-content">
              <div className="heading">
                <h4>Add inputs</h4>
                <div className="add-inputs-content environgment-details">
                  <div className="form-group description-content select-data-source">
                    <label htmlFor="Name">Name</label>
                    <input
                      className="input-group-text"
                      name="name"
                      value={addedDatasourceResponse.name}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="account-details-heading">
                <h5>Account Details</h5>
              </div>
              <div className="environgment-details">
                <div className="form-group description-content select-data-source">
                  <label htmlFor="description">Select Environment</label>
                  <input
                    className="input-group-text"
                    readOnly
                    value={environment}
                  />
                </div>
                <div className="form-group description-content select-data-source">
                  <label htmlFor="description">Select Account</label>
                  <input
                    className="input-group-text"
                    readOnly
                    value={account}
                  />
                </div>
              </div>
              <div className="source-details">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="source-box">
                      {datasourceData && (
                        <div className="source-detail-content">
                          {datasourceData.info && (
                            <div className="images">
                              <img
                                src={datasourceData.info.logos.small}
                                height="50px"
                                width="50px"
                                alt=""
                              />
                            </div>
                          )}
                          <div className="source-content">
                            <label>{datasourceData.name}</label>
                            <span>{datasourceData.type}</span>
                            {datasourceData.info && (
                              <p>{datasourceData.info.description}</p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="source-massage-content">
                        {!addCredForm && (
                          <span>
                            Please click on the button to add credential using
                            vault
                          </span>
                        )}
                        {!addCredForm && (
                          <button
                            className="asset-blue-button"
                            onClick={this.toggle}
                          >
                            Add Credential
                          </button>
                        )}
                        {addCredForm && (
                          <div className="environgment-details">
                            <h5>Connection Detail</h5>
                            <div className="form-group description-content select-data-source">
                              <label htmlFor="description">vault Key Id</label>
                              <input
                                type="text"
                                className="input-group-text"
                                name="accesskey"
                                value={credentialData.vaultId}
                                readOnly
                                onChange={this.onChangeDataSource}
                              />
                            </div>
                          </div>
                        )}
                        {addCredForm && (
                          <React.Fragment>
                            <button
                              className="asset-blue-button"
                              onClick={this.toggle}
                            >
                              Back
                            </button>
                            <Link to={`/explore-datasource`}>
                              <button className="asset-blue-button">
                                Explore
                              </button>
                            </Link>
                            <button
                              className="asset-blue-button"
                              onClick={this.editDataSource}
                            >
                              Save &#38; Test
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={addcredpopup}
          toggle={this.toggle}
          className="modal-container assetmanager-modal-container"
        >
          <ModalHeader >Synectiks Vault
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i class="fal fa-times"></i>
          </button>
          </ModalHeader>
          <ModalBody
            style={{
              height: "calc(60vh - 50px)",
              overflowY: "auto",
              display: "grid",
              overflowX: "hidden",
            }}
          >
            <div className="syneckit-content">
              <div className="heading">
                <p>
                  Showing Credentials for Account &#8758;{" "}
                  <span>
                    {environment.toUpperCase()} ({account})
                  </span>
                </p>
              </div>
              {credentialList &&
                credentialList.length > 0 &&
                credentialList.map((cred, i) => {
                  return (
                    <div className="form-group form-check credentials-text">
                      <input
                        type="radio"
                        value={cred.vaultId}
                        name="credentials"
                        onChange={(e) => this.setCred(e, cred, cred.vaultId)}
                      />
                      <span>{cred.vaultId}</span>
                    </div>
                  );
                })}
            </div>
            <div className="modal-submit-button text-right">
              <button
                className="asset-blue-button"
                onClick={this.addDataSourceCred}
              >
                Proceed
              </button>
            </div>
          </ModalBody>
        </Modal>
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={isAlertOpen}
          severity={severity}
          msg={message}
        />
      </div>
    );
  }
}

export default AddDatasourceCredential;
