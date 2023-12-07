import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Component } from "react";
class PermissionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.data || [],
    };
  }

  // Render head of table
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell width={100}>
            <Checkbox size="small" className="check-box" /> Permission name
          </TableCell>
          <TableCell width={200}>Status</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox size="small" className="check-box" />
                {row.permissionName}
              </TableCell>
              <TableCell>
                <button className="green-btn">Active</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };
  render() {
    return (
      <TableContainer component={Paper} className="access-control-table">
        <Table
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table"
          className="table"
        >
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  }
}

export default PermissionTable;