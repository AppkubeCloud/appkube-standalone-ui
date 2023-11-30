import { Box } from "@mui/material";
import { Component } from "react";
import AccordionView from "../Components/AccordionView";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
let accessPolicyData = [
  {
    name: "Product",
    subName: <button>Not Permitted</button>,
    chlidren: [
      {
        name: "Create Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Edit Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Clone Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Migrate Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Delete Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Replicate Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Delete service Product in Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Replicate service Product in Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
    ],
  },
];

class Disallowed extends Component {
  render() {
    return (
      <Box className="setting-table permission-table">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Premission set</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <AccordionView data={accessPolicyData} />
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Disallowed;