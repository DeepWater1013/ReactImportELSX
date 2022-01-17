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
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


import { ExcelRenderer } from 'react-excel-renderer';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import getExcelData from "layouts/tables/data/loadsListData";
// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";

import {
  useMaterialUIController,
  setExcelData,
  setExcelRows
} from "context";

function Tables() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    transparentSidenav,
    whiteSidenav,
    darkMode,
    excelData
  } = controller;
  const [file, setFile] = useState(null);
  const [originSheetData, setOriginSheetData] = useState(excelData);
  
  // const {excelHeader, setExcelHeader} = useState([]);
  useEffect(() => {
    if (file) {
      // just pass the fileObj as parameter
      ExcelRenderer(file, (err, resp) => {
        if (err) {
            console.log(err);
        }
        else {
          resp.rows.shift()
          resp.rows.shift();
          resp.rows.pop();

          const { columns, rows} = getExcelData(resp.rows.slice(1, resp.rows.length));
          setExcelRows(dispatch, resp.rows.slice(1, resp.rows.length));
          setExcelData(dispatch, {columns, rows})

          setOriginSheetData({
            columns,
            rows
          })          
        }
      });
    }
  }, [file])

  
  // const { columns, rows } = authorsTableData();






  const [disabled, setDisabled] = useState(false);

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);

  }, []);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={6}>
           <Grid item xs={2}>
              <MDButton
                color="dark"
                variant="gradient"
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
                component="label"
              >
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }} 
                />
                Input File
              </MDButton>
          </Grid>
          <Grid item xs={10}>
            <TextField variant="standard" fullWidth value={file ? file.name: ""} style={{ marginTop: "9px" }} />
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Loads List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {
                  originSheetData
                  ? 
                  <DataTable
                    table={originSheetData}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  :
                  false
                }
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
