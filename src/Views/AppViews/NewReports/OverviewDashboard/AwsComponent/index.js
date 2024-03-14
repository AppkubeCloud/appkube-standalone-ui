import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import HorizontalBarChart from "Views/AppViews/NewReports/Components/HorizontalBarChart";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
import MultiLineChart from "Views/AppViews/NewReports/Components/MultiLineChart";
import GaugeChart from "Views/AppViews/NewReports/Components/GaugeChart";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#A145FF" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FAA24B" },
  { label: "EKS", value: 4000, color: "#F9D33D" },
  { label: "Lambda", value: 3800, color: "#F9D33D" },
];
let donutData = [
  {
    age_group: "Compute Cost",
    population: 110011100,
  },
  {
    age_group: "Network ",
    population: 40267984,
  },
  {
    age_group: "Storage",
    population: 30672088,
  },
  {
    age_group: "Database",
    population: 53980105,
  },
  {
    age_group: "Others",
    population: 81489445,
  },
];

const spendTrendData = [
  {
    date: "1-05-12",
    last_quarter: 30000,
    current_quarter: 35000,
    forecasted_spend: 13000,
  },
  {
    date: "30-04-12",
    last_quarter: 35000,
    current_quarter: 40000,
    forecasted_spend: 23000,
  },
  {
    date: "27-04-12",
    last_quarter: 60000,
    current_quarter: 38000,
    forecasted_spend: 33000,
  },
  {
    date: "26-04-12",
    last_quarter: 34000,
    current_quarter: 33000,
    forecasted_spend: 44000,
  },
  {
    date: "25-04-12",
    last_quarter: 45000,
    current_quarter: 20000,
    forecasted_spend: 27000,
  },
  {
    date: "24-04-12",
    last_quarter: 33333,
    current_quarter: 22222,
    forecasted_spend: 11000,
  },
  {
    date: "23-04-12",
    last_quarter: 11111,
    current_quarter: 33333,
    forecasted_spend: 44000,
  },
  {
    date: "20-04-12",
    last_quarter: 34000,
    current_quarter: 44000,
    forecasted_spend: 40000,
  },
  {
    date: "19-04-12",
    last_quarter: 44000,
    current_quarter: 38888,
    forecasted_spend: 38000,
  },
  {
    date: "18-04-12",
    last_quarter: 33333,
    current_quarter: 11111,
    forecasted_spend: 34000,
  },
  {
    date: "17-04-12",
    last_quarter: 28000,
    current_quarter: 38000,
    forecasted_spend: 32000,
  },
  {
    date: "16-04-12",
    last_quarter: 29000,
    current_quarter: 39000,
    forecasted_spend: 30000,
  },
  {
    date: "13-04-12",
    last_quarter: 22000,
    current_quarter: 38000,
    forecasted_spend: 22000,
  },
];
var potentialSavingData = [
  { color: "#FF708B", percentage: 65, name: "Spot Instace", value: "532" },
  { color: "#FFBA69", percentage: 70, name: "Reserved Ins.", value: 539 },
  { color: "#01F1E3", percentage: 60, name: "Others", value: 4532 },
  { color: "#8676FF", percentage: 50, name: "Rightsizing", value: 786 },
];

let costOfTopAccounts = [
  { name: "IT Infra", value: 55000 },
  { name: "IT Security", value: 45000 },
  { name: "IT Ops", value: 40000 },
  { name: "IT Dev", value: 35000 },
  { name: "Analytics", value: 30000 },
  { name: "HR", value: 25050 },
  { name: "Marketing", value: 20050 },
  { name: "Finance", value: 15550 },
  { name: "Sales", value: 10550 },
  { name: "R&D", value: 10400 },
];
class AwsComponent extends Component {
  render() {
    return (
      <>
        <Box className="reports-charts">
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={3}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/spend-overview",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={250}
                    height={300}
                    otherData={{
                      centerValue: "$10,000",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <ChartWrapper
                data={{
                  title: "Top Used Service ",
                  labelOfBtn: " View Details",
                  description: "Total Cost Incurred",
                  link: "/app/new-reports/over-view-dashboard/top-use-services",
                }}
                ChartComponent={
                  <HorizontalBarChart
                    data={totalUsedServiceData}
                    chardBeforeRenderHTML={
                      <Box className="total-cost-incurred">
                        <p>
                          {" "}
                          90,579{" "}
                          <span>
                            {" "}
                            <i class="fas fa-sort-up p-l-5"></i> 10 &#37;
                          </span>
                        </p>
                      </Box>
                    }
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={5} lg={3}>
              <ChartWrapper
                data={{
                  title: "Potential Savings",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/potential-sevings",
                }}
                ChartComponent={<GaugeChart data={potentialSavingData} />}
              />
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <ChartWrapper
                data={{
                  title: "Cost of Top Accounts",
                  labelOfBtn: "View Details",
                  link: "/app/new-reports/over-view-dashboard/cost-top-accounts",
                }}
                ChartComponent={
                  <VerticalBarchart
                    data={costOfTopAccounts}
                    style={{ width: "100%", height: "350" }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <ChartWrapper
                ChartComponent={
                  <MultiLineChart
                    data={spendTrendData}
                    labels={[
                      { name: "Last Quarter", color: "orange" },
                      { name: "Current Quarter", color: "bule" },
                      { name: "Forecasted Spend", color: "pink" },
                    ]}
                  />
                }
                data={{
                  title: "Speding Trend",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/spending-trend",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default AwsComponent;