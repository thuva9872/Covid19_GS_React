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



import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { People } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [data,setData]=useState();
  useEffect(()=>{
    fetch(process.env.REACT_APP_API+'/admin/getDashboardData',{credentials:'include'})
     .then(response => response.json())
    .then(data=>setData(data.msg))
    .catch(e=>console.log(e));
  },[])
  console.log("auth-token:"+JSON.parse(localStorage.token).token);
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
              <p className={classes.cardCategory}>No of Laboratories</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.laboratory.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                No of laboratories in use
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <People />
              </CardIcon>
              <p className={classes.cardCategory}>No of Lecturers</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.lecturer.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Total number of Lecturers
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                {/* <Icon>info_outline</Icon> */} <People />
              </CardIcon>
              <p className={classes.cardCategory}>Technical Officers</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.technicalOfficer.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Total number of Technical officers
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <People />
              </CardIcon>
              <p className={classes.cardCategory}>No of Students</p>
              {/* fetch() */}
              <h3 className={classes.cardTitle}>{data==null ? "Loading..." : data.student.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DescriptionIcon />
                Total number of Students
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
     
      <GridContainer>
               <GridItem xs={12} sm={12} md={12}>
          {/* <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>User Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Email", "Country"]}
                // fetch()
                tableData={[
                  ["1", "Dakota Rice", "abc@gmail.com", "Niger"],
                  ["2", "Minerva Hooper", "abc@gmail.com", "Curaçao"],
                  ["3", "Sage Rodriguez", "abc@gmail.com", "Netherlands"],
                  ["4", "Philip Chaney", "abc@gmail.com", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card> */}
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
