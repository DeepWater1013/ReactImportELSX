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
import React, {useState, useEffect} from "react";
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
import {
  useMaterialUIController,
  setInputParams
} from "context";

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
  const [controller, dispatch] = useMaterialUIController();
  const {
    inputParams
  } = controller;
  // const { sales, tasks } = reportsLineChartData;
  const [switchValue, setSwitchValue] = useState(inputParams.switchValue);
  const [originValue, setOriginValue] = useState(inputParams.originValue);
  const [destinationValue, setDistinationValue] = useState(inputParams.destinationValue);
  const [radiusValue, setRadiusValue] = useState(inputParams.radiusValue);
  const [averageValue, setAverageValue] = useState(inputParams.averageValue);
  const [runtimeValue, setRuntimeValue] = useState(inputParams.runtimeValue);
  const [totalValue, setTotalValue] = useState(inputParams.totalValue);
  const [totalDistanceValue, setTotalDistanceValue] = useState(inputParams.totalDistanceValue);
  const [deadheadValue, setDeadheadValue] = useState(inputParams.deadheadValue);
  const [inputParamsValue, setInputParamsValue] = useState(inputParams);

  useEffect(() => {
    setInputParams(dispatch, inputParamsValue);
  }, [inputParamsValue])

 

  const handleSwitchChange = (event, newValue) => {
    inputParamsValue.switchValue = newValue;
    setSwitchValue(newValue);
    setInputParamsValue(inputParamsValue);
  };

  const handleOriginChange = (e) => {
    inputParamsValue.originValue = e.target.value;
    setOriginValue(e.target.value);
    setInputParamsValue(inputParamsValue);
  }

  const handleDistinationChange = (e) => {
    inputParamsValue.destinationValue = e.target.value;
    setDistinationValue(e.target.value);
    setInputParamsValue(inputParamsValue);
  }
  const handleRadiusChange = (e) => {
    if(e.target.value * 1 >= 0) {
      inputParamsValue.radiusValue = e.target.value;
      setRadiusValue(e.target.value);
      setInputParamsValue(inputParamsValue);
    }      
  }

  const handleAverageChange = (e) => {
    if(e.target.value * 1 >= 0) {
      inputParamsValue.averageValue = e.target.value;
      setAverageValue(e.target.value)
      setInputParamsValue(inputParamsValue);
    }
      
  }

  const handleRuntimeChange = (e) => {
    if(e.target.value * 1 >= 0 && e.target.value <=24) {
      inputParamsValue.runtimeValue = e.target.value;
      setRuntimeValue(e.target.value)
      setInputParamsValue(inputParamsValue);
    }
  }

  const handleTotalChange = (e) => {
    if(e.target.value * 1 >= 0) {
      inputParamsValue.totalValue = e.target.value;
      setTotalValue(e.target.value)
      setInputParamsValue(inputParamsValue);
    }
  }
  const handleTotalDistanceChange = (e) => {
    if(e.target.value * 1 >= 0) {
      inputParamsValue.totalDistanceValue = e.target.value;
      setTotalDistanceValue(e.target.value)
      setInputParamsValue(inputParamsValue);
    }
  }

  const handleDeadheadChange = (e) => {
    if(e.target.value * 1 >= 0) {
      inputParamsValue.deadheadValue = e.target.value;
      setDeadheadValue(e.target.value)
      setInputParamsValue(inputParamsValue);
    }
  }

  return (
     <DashboardLayout>
        <DashboardNavbar /> 
      <MDBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Orign..." fullWidth value={originValue} onChange={handleOriginChange}/>
              </Grid>
              <Grid item xs={7}>
                <TextField fullWidth label="Destination..." value={destinationValue} onChange={handleDistinationChange}/>
              </Grid>
              
              <Grid item xs={5}>
                <TextField fullWidth label="Radius [km]..." type="number" value={radiusValue} onChange={handleRadiusChange}/>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={switchValue} onChange={handleSwitchChange} aria-label="basic tabs example">
                      <Tab label="Velocity and Time Mode" {...a11yProps(0)} />
                      <Tab label="Total Distance Mode" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={switchValue} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Average Velocity [km/h]..." value={averageValue} onChange={handleAverageChange} /> 
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Runtime per a day [hour]..." value={runtimeValue} onChange={handleRuntimeChange} /> 
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Total delivery days [day]..." value={totalValue} onChange={handleTotalChange}/>
                      </Grid>
                    
                    </Grid>
                  </TabPanel>
                  <TabPanel value={switchValue} index={1}>
                    <Grid item xs={12}>
                      <TextField fullWidth type="number" label="Total Distance[km]..." value={totalDistanceValue} onChange={handleTotalDistanceChange}/>
                    </Grid>
                  </TabPanel>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Maximum Deadhead[km]..." value={deadheadValue} onChange={handleDeadheadChange}/>
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
