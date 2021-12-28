/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import React from "react";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import { Dashboard } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Params() {
  // const { sales, tasks } = reportsLineChartData;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
     <DashboardLayout>
        <DashboardNavbar /> 
      <MDBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Orign..." fullWidth />
              </Grid>
              <Grid item xs={7}>
                <TextField fullWidth label="Destination..." />
              </Grid>
              
              <Grid item xs={5}>
                <TextField fullWidth label="Radius [km]..." type="number"/>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Velocity and Time Mode" {...a11yProps(0)} />
                      <Tab label="Total Distance Mode" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Average Velocity [km/h]..." /> 
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Runtime per a day [hour]..." /> 
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Total delivery days [day]..." />
                      </Grid>
                    
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid item xs={12}>
                      <TextField fullWidth type="number" label="Total Distance[km]..." />
                    </Grid>
                  </TabPanel>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Maximum Deadhead[km]..." />
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </MDBox>
      
      
       {/* <Footer /> */}
     </DashboardLayout>
  );
}

export default Params;
