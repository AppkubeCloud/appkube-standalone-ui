import React, { Component } from "react";
import { Box, Button, Card } from "@mui/material";
import admissionIcon from "../../../assets/img/bimapping/admission.png";
import searchIcon from "../../../assets/img/bimapping/search.png";
import filterIcon from "../../../assets/img/bimapping/filter.png";
import rbacIcon from "../../../assets/img/bimapping/rbac.png";

class ProductCategory extends Component {
  render() {
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Product category : SOA</h3>
        </Box>
        <Box className="product-category-container">
          <Box className="d-block">
            <Card className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Business Services</h3>
                <Button className="primary-btn">Add</Button>
              </Box>
            </Card>
            <Card className="product-info-card">
              <Box className="service-container">
                <Card className="service-card">
                  <Box className="service-details">
                    <img src={admissionIcon} alt="" />
                    <span className="d-block name">Admission</span>
                  </Box>
                </Card>
              </Box>
            </Card>
          </Box>
          <Box className="d-block">
            <Card className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Common Services</h3>
                <Button className="primary-btn">Add</Button>
              </Box>
            </Card>
            <Card className="product-info-card">
              {/* <Box className="content">
                <p>
                  Driving innovation and efficiency in Business Services through
                  seamless integration of SOA and microservices architecture
                </p>
              </Box> */}
              <Box className="service-container">
                <Card className="service-card">
                  <Box className="service-details">
                    <img src={searchIcon} alt="" />
                    <span className="d-block name">Search</span>
                  </Box>
                </Card>
                <Card className="service-card">
                  <Box className="service-details">
                    <img src={filterIcon} alt="" />
                    <span className="d-block name">Filter</span>
                  </Box>
                </Card>
                <Card className="service-card">
                  <Box className="service-details">
                    <img src={rbacIcon} alt="" />
                    <span className="d-block name">RBAC</span>
                  </Box>
                </Card>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProductCategory;