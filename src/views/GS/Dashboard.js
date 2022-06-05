import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import { useEffect,useState } from "react";
import DescriptionIcon from "@material-ui/icons/Description";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
import useToken from "useToken";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { People } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [data,setData]=useState();
  const {token,setToken}=useToken();
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API + "/gs/getDashboard/", { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setData(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert(e))
  },[])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                {/* <Icon>content_copy</Icon> */}
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Population</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.population}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Population of the Division
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <People />
              </CardIcon>
              <p className={classes.cardCategory}>No of Covid19 Cases</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.covid}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Total number of Covid Cases in the Division
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                {/* <Icon>info_outline</Icon> */} <People />
              </CardIcon>
              <p className={classes.cardCategory}>Vaccination Count</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.vaccination}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Total number of Vaccination in the Division
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
