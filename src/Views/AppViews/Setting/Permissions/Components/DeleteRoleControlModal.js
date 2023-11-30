import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

class DeleteRoleControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleDeleteRoleControlModal}
        className="setting-modal-container delete-policy-modal"
      >
        <ModalBody>
          <Box className="delete-policy-content text-center">
            <Box className="delete-icon">
              <i class="fas fa-trash-alt"></i>
            </Box>
            <h5>Do you want to delete this Role?</h5>
            <p>This action can’t be undone</p>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn   m-r-2"
              variant="contained"
              onClick={this.props.handleDeleteRoleControlModal}
            >
              Delete
            </LoadingButton>
            <LoadingButton
              className="secondary-btn "
              variant="contained"
              onClick={this.handleCloseModal}
            >
              Cancel
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteRoleControlModal;