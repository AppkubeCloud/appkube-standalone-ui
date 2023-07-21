import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid } from "@mui/material";
import { v4 } from "uuid";
let transformScale = 0;

class TopologyView extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      selectedView: {
        level2Show: false,
        selectedLevel1Id: null,
        selectedLevel2Id: null,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedBreadCrumbs?.breadcrumbId !==
      this.props.selectedBreadCrumbs?.breadcrumbId
    ) {
      let { cloudName, selectedLevel1, selectedLevel2 } =
        this.props.selectedBreadCrumbs;
      let { selectedLevel1Id } = this.state.selectedView;

      if (!selectedLevel1 && !selectedLevel2) {
        this.onClickAccountId();
      } else if (selectedLevel1 && !selectedLevel2) {
        this.onClickLevel1(selectedLevel1Id, selectedLevel1);
      }
    }
  }
  /** Render the main body including level-1 and level-2 data. */
  renderMainBody = () => {
    const { data } = this.props;
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    return Object.keys(data).length &&
      (data?.children[0].length || data?.children[1].length) ? (
      <ArcherContainer noCurves style={{ width: "100%", height: "100%" }}>
        <TransformWrapper
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            return (
              <React.Fragment>
                <div className="gmnoprint">
                  <div className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div
                    className="gmnoprint-map"
                    onClick={() => {
                      zoomToElement("custom_location", transformScale);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </div>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    transform: "translate(0px, 0px) scale(0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArcherElement
                    id="root"
                    relations={
                      selectedLevel1Id !== null && selectedLevel1Id >= 0
                        ? [
                            {
                              targetId:
                                selectedLevel1Id >= 0
                                  ? `level1_${selectedLevel1Id}`
                                  : "",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: {
                                strokeColor: "#a5a5d7",
                                strokeWidth: 2,
                              },
                            },
                          ]
                        : []
                    }
                  >
                    <div
                      className="services-text-box active"
                      onClick={() => {
                        this.onClickAccountId();
                      }}
                      id={`${
                        selectedLevel1Id === null && selectedLevel2Id === null
                          ? "custom_location"
                          : ""
                      }`}
                    >
                      <div className="d-flex">
                        <div className="account-image">
                          <img src={data.image} alt="aws image" />
                        </div>
                        <div className="account-id">
                          <span id="custom_location_1" className="d-block">
                            {data.label}
                          </span>
                          <span className="d-block">{data.subLabel}</span>
                        </div>
                      </div>
                    </div>
                  </ArcherElement>
                  <div
                    className={` ${
                      data?.children[0].length ? "global-servies" : ""
                    } `}
                  >
                    <ul>{this.renderLevel1()}</ul>
                  </div>
                  <div
                    className={` ${
                      level2Show ? "global-servies cluster-servies" : ""
                    }`}
                    style={{
                      marginTop: "0",
                      marginBottom: "0",
                      transform: "translateY(0%)",
                    }}
                  >
                    <ul>{level2Show && this.renderLevel2(selectedLevel1Id)}</ul>
                  </div>
                </TransformComponent>
              </React.Fragment>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    ) : (
      ""
    );
  };

  /** If level-1 data is exist, then Render the  level-1 html. */
  renderLevel1 = () => {
    const { children } = this.props.data;
    const { selectedLevel1Id, selectedLevel2Id } = this.state.selectedView;
    if (children.length) {
      return children[0].map((level1, level1Index) => {
        return (
          <ArcherElement
            id={`level1_${level1Index}`}
            relations={
              level1Index === selectedLevel1Id && selectedLevel2Id !== null
                ? [
                    {
                      targetId:
                        level1Index === selectedLevel1Id &&
                        selectedLevel2Id >= 0
                          ? `level2_${selectedLevel2Id}`
                          : "",
                      targetAnchor: "left",
                      sourceAnchor: "right",
                      style: {
                        strokeColor: "#a5a5d7",
                        strokeWidth: 2,
                      },
                    },
                  ]
                : []
            }
            key={v4()}
          >
            <li
              className={`${level1Index === selectedLevel1Id ? "active" : ""}`}
              id={`${
                level1Index === selectedLevel1Id && selectedLevel2Id == null
                  ? "custom_location"
                  : ""
              }`}
              onClick={() => {
                this.onClickLevel1(level1Index, level1.label);
              }}
            >
              <span>
                <img src={level1.image} alt="" />
              </span>
              {this.getServiceName(level1.label, "vpc")}
            </li>
          </ArcherElement>
        );
      });
    }
  };

  /** If level-2 data is exist, then Render the  level-2 html. */
  renderLevel2(index) {
    const { children } = this.props.data;
    const { selectedLevel1Id, selectedLevel2Id } = this.state.selectedView;
    let data = children[0][index].children;

    if (data.length) {
      return data.map((level2, level2Index) => {
        return (
          <ArcherElement id={`level2_${level2Index}`} key={v4()}>
            <li
              onClick={() => {
                this.onClickLevel2(level2Index, level2.label);
              }}
              className={`${level2Index === selectedLevel2Id ? "active" : ""}`}
              id={`${
                level2Index === selectedLevel2Id && selectedLevel1Id >= 0
                  ? "custom_location"
                  : ""
              }`}
            >
              <span>
                <img src={level2.image} alt="" />
              </span>
              {this.getServiceName(level2.label)}
            </li>
          </ArcherElement>
        );
      });
    }
  }

  /** Get name in form of capitalize. */
  getServiceName(name, type) {
    if (type === "vpc") {
      return name ? name.toUpperCase() : "";
    } else {
      let firstChar = name ? name.charAt(0).toUpperCase() : "";
      let otherStr = name ? name.toLowerCase().slice(1) : "";
      let string = firstChar + otherStr;
      return string;
    }
  }

  /** Fire click event specific level-1. */
  onClickLevel1 = (id, label) => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    const { children } = this.props.data;
    let level2DataLength = children[0][id]?.children.length;

    level2Show = false;
    if (level2DataLength) level2Show = true;

    selectedLevel1Id = id;
    selectedLevel2Id = null;
    this.props.setLevel(label);
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  /** Fire click event specific level-2. */
  onClickLevel2 = (id, label) => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    selectedLevel2Id = id;
    this.props.setLevel(label, 1);
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  /** Fire click event AccountId. */
  onClickAccountId = () => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    level2Show = false;
    selectedLevel1Id = null;
    selectedLevel2Id = null;
    this.props.setLevel("");
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  render() {
    return (
      <>
        <Grid item xs={7}>
          <Box className="services-panel">
            <Box className="services-panel-title bottom-border">
              <Box className="name">Infra Topology View</Box>
              <Box className="back-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </Box>
            </Box>
            <Box className="services-panel-body">{this.renderMainBody()}</Box>
          </Box>
        </Grid>
      </>
    );
  }
}

export default TopologyView;