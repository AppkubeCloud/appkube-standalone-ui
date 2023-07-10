import React, { Component } from "react";
import { Box, Grid } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class SelectLanguagePopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container select-language-modal"
      >
        <ModalHeader>
          Select Language
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "70px" }}
        >
          <Box className="checkbox-group">
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="all" />
              <label>All</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Application" />
              <label>Application</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="NET" />
              <label>ASP.NET</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Automation" />
              <label>Automation</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Eleventry" />
              <label>Eleventry</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Gatsby" />
              <label>Gatsby</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="API" />
              <label>API</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Framework" />
              <label>Framework</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Hugo" />
              <label>Hugo</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Pyramid" />
              <label>Pyramid</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Spring" />
              <label>Spring</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="Microservices" />
              <label>Microservices</label>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton className="secondary-btn m-r-2" variant="contained">
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
            >
              Apply
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectLanguagePopup;