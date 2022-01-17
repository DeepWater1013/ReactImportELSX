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
import React, {useEffect, useState} from "react"

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import mapExcel from "./map/city_input.txt"

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {
  useMaterialUIController,
} from "context";
import axios from "axios"
import { letterSpacing } from "@mui/system";


function Results() {
  const [controller] = useMaterialUIController();
  const [cityList, setCityList] = useState([]);
  const [citiesInfo, setCitiesInfo] = useState([]);
  const [dist, setDist] = useState([]);
  const [dlv, setDlv] = useState([]);
  const [allDlvCount, setAllDlvCount] = useState(0);
  const [optLoop, setOptLoop] = useState([]);
  const [startp, setStartp] = useState(-1);
  const [endp, setEndp] = useState(-1);
  const [deadhead, setDeadhead] = useState(0);
  const [maxDist, setMaxDist] = useState(0);

  const {
    excelRows,
    inputParams
  } = controller;

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  const getDistanceTwoPoints = (origin, destination) => {    
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(destination[3]-origin[3]);  // deg2rad below
    let dLon = deg2rad(destination[4]-origin[4]); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(origin[3])) * Math.cos(deg2rad(destination[3])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    d = Math.round(d)
    return d;
  }

  const getDistanceList = async() => {
    let dist = [];
    citiesInfo.map(() => {
      let subDist = [];
      citiesInfo.map(() => {
        subDist.push(-1);
      })
      dist.push(subDist);
    })
    for(let i = 0; i < citiesInfo.length - 1; i++) {
      dist[i][i] = 0;
      for(let j = i + 1; j < citiesInfo.length; j++) {
        dist[i][j] = getDistanceTwoPoints(citiesInfo[i], citiesInfo[j]);        
      }
    }

    setDist(dist);
  }

  const getCityList = () => {
    let cities = [];
    excelRows.map((item, index) => {
      if(index > 55) return;
      if(!item[7] || !item[8]) return
      const originPlaceArray = item[7].split(",");
      const destinationArray = item[8].split(",");
      if(!destinationArray[1] || !originPlaceArray[1]) return;
      originPlaceArray[1] = originPlaceArray[1].replace(" ", "");
      destinationArray[1] = destinationArray[1].replace(" ", "");
      let index1 = -1;
      let index2 = -1;
      cities.map((city, index) => {
        if(city[0] == originPlaceArray[0] && city[1] == originPlaceArray[1]) {
          index1 = index
        }
        if(city[0] == destinationArray[0] && city[1] == destinationArray[1]) {
          index2 = index
        }
      })
      if(index1 == -1) {
        cities.push(originPlaceArray)
      }
      if(index2 == -1) {
        cities.push(destinationArray)
      }
    });

    setCityList(cities);
  }

  const getMapData = async() => {
    let cities = []
    await axios(mapExcel)
    .then(res => {
      let rows = res.data.split("\r\n");
      cityList.map((city) => {
        rows.map((row) => {
          let columns = row.split("\t");
          if(city[0] == columns[0] && city[1] == columns[1]) {
            cities.push(columns);
          }
        })
      })   
    });

    setCitiesInfo(cities);
  }

  const getDeliverList = () => {
    let deliverList = [];
    excelRows.map((row) => {
      const originPlaceArray = row[7].split(",");
      const destinationArray = row[8].split(",");
      if(!destinationArray[1] || !originPlaceArray[1]) return;
      originPlaceArray[1] = originPlaceArray[1].replace(" ", "");
      destinationArray[1] = destinationArray[1].replace(" ", "");
      let deliver = {};
      deliver.cnt = row[2];
      citiesInfo.map((city, index) => {
        if(city[0] == originPlaceArray[0] && city[1] == originPlaceArray[1]) {
          deliver.org = index;
        }
        if(city[0] == destinationArray[0] && city[1] == destinationArray[1]) {
          deliver.tgt = index;
        }
      })

      if(deliver.org == undefined || deliver.tgt == undefined)  {
        return;
      }
      deliverList.push(deliver);
    })
    setDlv(deliverList);
  }

  const getinitialValues = () => {
    if(!inputParams.originValue) return;
    if(!cityList.length) return;
    let orgArray = inputParams.originValue.split(",");
    let destArray = inputParams.destinationValue.split(",");
    let maxDist = inputParams.totalDistanceValue * 1;
    let deadhead = inputParams.deadheadValue * 1;
    if(!orgArray[1] || !destArray[1] || !maxDist || !deadhead) return;
    orgArray[1] = orgArray[1].replace(" ", "");
    destArray[1] = destArray[1].replace(" ", "");
    let startp = -1;
    let endp = -1;
    cityList.map((city, index) => {
      if(city[0] == orgArray[0] && city[1] == orgArray[1]) {
        startp = index;
      }
      if(city[0] == destArray[0] && city[1] == destArray[1]) {
        endp = index;
      }
    })
    setStartp(startp);
    setEndp(endp);
    setDeadhead(deadhead);
    setMaxDist(maxDist);
  }

  useEffect(() => {
    getCityList();   
  }, [])

  useEffect(() => {
    getMapData();
    getinitialValues();
  }, [cityList])

  useEffect(() => {
    getDistanceList();
    getDeliverList(); 
  }, [citiesInfo]);

  useEffect(() => {
    let count = 0;
    dlv.map((item) => {
      count += item.cnt;
    })
    setAllDlvCount(count);
  }, [dlv])

  useEffect(() => {
    let optLoop = [];
    for(let i = 0; i < citiesInfo.length; i++) {
      optLoop.push([]);
      for(let j = 0; j < allDlvCount; j++) {
        let loop = {};
        loop.cum_dist = Number.MAX_SAFE_INTEGER;
        loop.btask = false;
        loop.prev_city = -1;
        optLoop[i].push(loop);
      }
    }
    setOptLoop(optLoop);
  }, [allDlvCount])

  const doYouHaveJob = (sp, ep) => {
    for(let i=0; i< dlv.length; i++)
    {
      if(dlv[i].org == sp && dlv[i].tgt == ep && dlv[i].cnt>0)
      return i;
    }
    return -1;
  }
 
  const goDeliver = (curCity, doneCnt) => {
    let i, tgtCity, accumDist;
    for(tgtCity = 0; tgtCity < citiesInfo.length; tgtCity ++) {
      if(tgtCity == curCity) continue;
      accumDist = optLoop[curCity][doneCnt].cum_dist + dist[curCity][tgtCity];
      if(accumDist >= maxDist) continue;

      i = doYouHaveJob(curCity, tgtCity);
      if(i >= 0) {
        if(accumDist >= optLoop[tgtCity][doneCnt+1].cum_dist) continue;
        optLoop[tgtCity][doneCnt+1].cum_dist = accumDist;
        optLoop[tgtCity][doneCnt+1].btsk = true;
        optLoop[tgtCity][doneCnt+1].prev_city = curCity;
        dlv[i].cnt--;

        goDeliver(tgtCity, doneCnt+1);
        dlv[i].cnt++;
        continue;
      }

      if(dist[curCity][tgtCity] > deadhead) continue;

      if(accumDist>=optLoop[tgtCity][doneCnt].cum_dist) continue;

      optLoop[tgtCity][doneCnt].cum_dist = accumDist;
      optLoop[tgtCity][doneCnt].btsk = false;
      optLoop[tgtCity][doneCnt].prev_city = curCity;
      goDeliver(tgtCity, doneCnt);
    }
  }

  const calculateDistance = () => {
    optLoop[startp][0].cum_dist = 0;
    goDeliver(startp, 0)
    console.log(optLoop);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDButton
          color="dark"
          variant="gradient"
          component="label"
          onClick={calculateDistance}
        >
          result
        </MDButton>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Results;
