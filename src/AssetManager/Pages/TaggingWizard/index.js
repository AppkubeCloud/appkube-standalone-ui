import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../../../assets/img/search-icon.svg";
import Wizard from "./Wizard";
import DiscoveredAssets from "./DiscoveredAssets";
import TaggedAssets from "./TaggedAssets";
import UntaggedAssets from "./UntaggedAssets";

export class TaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_detail: true,
      displaygetEnvironmentData: null,
      cloudAssets: [],
    };
    this.steps = [
      {
        name: "Discovered Assets",
        component: <DiscoveredAssets {...props} />,
      },
      {
        name: "Tagged Assets",
        component: <TaggedAssets {...props} />,
      },
      {
        name: "Inputs",
        component: <UntaggedAssets {...props} />,
      },
    ];
  }
  
  render() {
    return (
      <div className="asset-container">
        <div className="tagging-wizard-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Discovered Assets</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link className="m-r-1">
                    <img
                      alt="jobs"
                      src={SearchIcon}
                      style={{ maxWidth: "20px" }}
                    />
                  </Link>
                  <Link
                    to="/assetmanager/pages/environments"
                    type="button"
                    className="btn btn-link m-r-0"
                  >
                    <i className="far fa-arrow-alt-circle-left" />
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <Wizard steps={this.steps} submitPage={this.submitPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default TaggingWizard;