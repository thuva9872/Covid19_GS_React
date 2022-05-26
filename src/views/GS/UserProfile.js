import React, { useState,useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import useToken from "useToken";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [data,setData]=useState();
  useEffect(()=>{
    fetch(process.env.REACT_APP_API+'/admin/getUserDetails',{credentials:'include'})
     .then(response => response.json())
    .then(data=>setData(data.msg))
    .catch(e=>console.log(e));
  },[])
  console.log(data);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Profile</h4>
              <p className={classes.cardCategoryWhite}>User Details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
               
                <GridItem xs={12} sm={12} md={6}>
                 {/* fetch() */}
                  <CustomInput
                    labelText="Username"
                    id="username"
                    value={data!=null ? data.user_id : "Loading"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                 {/* fetch() */}
                  <CustomInput
                    labelText="Email address"
                    id="email_address"
                    value={data!=null ? data.email : "Loading"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  >data.user_id</CustomInput>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                {/* fetch() */}
                  <CustomInput
                    labelText="First Name"
                    id="first_name"
                    value={data!=null ? data.first_name : "Loading"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                {/* fetch() */}
                  <CustomInput
                    labelText="Last Name"
                    id="last_name"
                    value={data!=null ? data.last_name : "Loading"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                 {/* fetch() */}
                  <CustomInput
                    labelText="Contact No"
                    id="contact_no"
                    value={data!=null ? data.contact_no : "Loading"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
               
              </GridContainer>
             
            </CardBody>
            {/* <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter> */}
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
             
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
