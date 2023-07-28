import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import clusterIcon from "assets/img/assetmanager/cluster-icon.png";
import webLayerIcon from "assets/img/assetmanager/web-layer-icon.png";
import dataLayerIcon from "assets/img/assetmanager/data-layer-icon.png";
import appLayerIcon from "assets/img/assetmanager/app-layer-icon.png";

import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  Button,
} from "@mui/material";

class Application extends Component {
  tabMapping = [
    {
      name: "List View",
      iconName: "fas fa-list p-r-5",
      dataKey: "ListView",
    },
    {
      name: "Grid View",
      iconName: "fas fa-th-large p-r-5",
      dataKey: "GridView",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      dataTierSoc: [
        {
          name: "Majesco",
        },
        {
          name: "Xuber",
        },
        {
          name: "Insurity",
        },
        {
          name: "Vertafore",
        },
        {
          name: "Guidewire",
        },
        {
          name: "Duck Creek",
        },
        {
          name: "eBaoTech",
        },
      ],
      activeTierTabIndexes: [],
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleTierTabToggle = (index, type) => {
    let { activeTierTabIndexes } = this.state;
    if (activeTierTabIndexes.includes(index) && type !== "soa") {
      activeTierTabIndexes = activeTierTabIndexes.filter(
        (item) => item !== index
      );
    }
    if (!activeTierTabIndexes.includes(index) && type !== "3Tier") {
      activeTierTabIndexes.push(index);
    }
    this.setState({ activeTierTabIndexes });
  };

  renderLogistics() {
    let { dataTierSoc, activeTierTabIndexes } = this.state;
    const JSX = [];
    dataTierSoc.map((data, index) => {
      JSX.push(
        <Box className="logistics-card" key={data.ec2Id}>
          <Box className="heading">{data.name}</Box>
          <Box className="contents">
            <div className="d-block width-100">
              <Box className="tier-buttons">
                <Button
                  className={
                    !activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "Dev")}
                >
                  Dev
                </Button>
                <Button
                  className={
                    activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "Test")}
                >
                  Test
                </Button>
                <Button
                  className={
                    !activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "Stage")}
                >
                  Stage
                </Button>
                <Button
                  className={
                    activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "Prod")}
                >
                  Prod
                </Button>
              </Box>
              <Box className="tier-contents">
                <ul></ul>
              </Box>
            </div>
          </Box>
        </Box>
      );
    });
    return JSX;
  }

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <h3 className="m-b-4">My Workspace</h3>
          <Box className="d-flex justify-content-center align-items-center">
            <Box className="lest-view">
              <List>
                {this.tabMapping.map((tabData, index) => {
                  return (
                    <ListItem
                      key={`${index}`}
                      className={index === activeTab ? "active" : ""}
                      onClick={() => this.setActiveTab(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <a style={{ cursor: "pointer" }}>
                        <i className={tabData.iconName}></i>
                        {tabData.name}
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
        {activeTab === 0 && (
          <Box className="environment-table-section">
            <TableContainer className="table">
              <Table className="overview">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Application</TableCell>
                    <TableCell align="center">LOB</TableCell>
                    <TableCell align="center">Environment</TableCell>
                    <TableCell align="center">RPO</TableCell>
                    <TableCell align="center">RTO</TableCell>
                    <TableCell align="center">Web Layer</TableCell>
                    <TableCell align="center">App Layer</TableCell>
                    <TableCell align="center">Data Layer</TableCell>
                    <TableCell align="center">Auxiliary</TableCell>
                    <TableCell align="center">DR Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Majesco</Link>
                    </TableCell>
                    <TableCell align="center">Claims</TableCell>
                    <TableCell align="center">Dev</TableCell>
                    <TableCell align="center">5 min</TableCell>
                    <TableCell align="center">2 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <span className="done">Done</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Xuber</Link>
                    </TableCell>
                    <TableCell align="center">Finance</TableCell>
                    <TableCell align="center">Test</TableCell>
                    <TableCell align="center">8 min</TableCell>
                    <TableCell align="center">4 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="orange"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="done">Done</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Insurity</Link>
                    </TableCell>
                    <TableCell align="center">Legal</TableCell>
                    <TableCell align="center">Stage</TableCell>
                    <TableCell align="center">5 min</TableCell>
                    <TableCell align="center">5 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="orange"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="error">Error</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Vertafore</Link>
                    </TableCell>
                    <TableCell align="center">Reimbursement</TableCell>
                    <TableCell align="center">Prod</TableCell>
                    <TableCell align="center">10 min</TableCell>
                    <TableCell align="center">2 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="done">Done</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Guidewire</Link>
                    </TableCell>
                    <TableCell align="center">Claims</TableCell>
                    <TableCell align="center">Prod</TableCell>
                    <TableCell align="center">2 min</TableCell>
                    <TableCell align="center">3 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="orange"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="inprogress">Inprogress</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>Duck Creek</Link>
                    </TableCell>
                    <TableCell align="center">Legal</TableCell>
                    <TableCell align="center">Test</TableCell>
                    <TableCell align="center">5 min</TableCell>
                    <TableCell align="center">2.5 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="done">Done</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link to={`#`}>eBaoTech</Link>
                    </TableCell>
                    <TableCell align="center">Cashless</TableCell>
                    <TableCell align="center">Prod</TableCell>
                    <TableCell align="center">3 min</TableCell>
                    <TableCell align="center">2 hrs</TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="availability-box">
                        <span className="green"></span>
                        <div className="availability-hover-bg"></div>
                        <Box className="availability-hover">
                          <p>
                            Primary Location:{" "}
                            <strong>US-East - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Location:{" "}
                            <strong>US-West - EC2 657907747554</strong>
                          </p>
                          <p>
                            DR Status: <strong>Provisioned</strong>
                          </p>
                          <p>
                            Last Failover: <strong>07/07/2023 12.15PM</strong>
                          </p>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <div className="done">Done</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {activeTab === 1 && (
          <Box className="logistics-cards">{this.renderLogistics()}</Box>
        )}
      </Box>
    );
  }
}

export default Application;
