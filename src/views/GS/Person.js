import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import "react-responsive-modal/styles.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Container } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Typography } from "@material-ui/core";
import axios from "axios";
import useToken from "useToken";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: "100%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    borderRight: "2px solid blue",
    borderLeft: "2px solid blue",
    borderBottom: "2px solid blue",
    //boxShadow: theme.shadows[1],
    padding: theme.spacing(6, 4, 3),
  },
  form: {
    position: "relative",
    width: "100%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    border: "2px solid blue",
    // borderRight: "2px solid blue",
    // borderLeft: "2px solid blue",

    //boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 4, 3),
  },
}));

export default function Person() {

  const classes = useStyles();

  async function addPersonHandler() {
    axios
      .post(process.env.REACT_APP_API + "/gs/addPerson", {
        nic,
        name,
        address,
        familyId,
        dateOfBirth,
        job,
        jobLocation
      }, { headers: { 'Authorization': "Bearer " + token } })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setCurrentWindow("menu")
        }
      })
      .catch(e => alert("Invalid data"));
  }

  async function getPersonDetailHandler() {
    axios
      .get(process.env.REACT_APP_API + "/gs/person/" + findNic, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setPersonDetail(response.data);
        } else {
          alert("Person not found");
          setPersonDetail({})
        }
      })
      .catch((e) => {
        alert("Person not Found!!!");
        setPersonDetail({});
      });
  }
  const { token, setToken } = useToken();
  const [nic, setNic] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [familyId, setFamilyId] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [job, setJob] = useState();
  const [jobLocation, setJobLocation] = useState();
  const [findNic, setFindNic] = useState();
  const [personDetail, setPersonDetail] = useState({});
  const [currentWindow, setCurrentWindow] = useState("menu");
  console.log(currentWindow)
  console.log(personDetail);
  const [data, setData] = useState()
  const menu = (
    <div>
      <br /> <br /> <br />
      <Container maxWidth="sm">
        <Stack
          sx={{ pt: 4 }}
          direction="column"
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={() => setCurrentWindow("addPerson")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Add new person</Button>
          <br />
          <Button
            onClick={() => setCurrentWindow("viewPerson")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >View details of a person</Button>
        </Stack>
      </Container>
    </div>
  );

  const addPerson = (
    <div>
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        { } <Button
          onClick={() => setCurrentWindow("menu")}
          type="submit"
          style={{ minWidth: "5%" }}
          variant="contained"
          color="green"
          className={classes.submit}
        >
          Back
        </Button>
        <br />
        <br />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "right",
          justifyContent: "right",
          height: "100%",
        }}
      >
        <Grid component="main" className={classes.root}>
          <CssBaseline />

          <Grid>
            <div>
              <form className={classes.form} style={{borderBottom:"2px solid blue"}} noValidate>
                <Typography component="h1" variant="h5">
                  Add New Person
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="ID"
                  label="NIC"
                  name="NIC"
                  autoComplete="National Identity Number"
                  autoFocus
                  onChange={(e) => setNic(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="uname"
                  label="Full Name"
                  name="fullNmae"
                  autoComplete="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoFocus
                />

                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="familyId"
                  label="Family ID"
                  name="familyId"
                  autoComplete="Family ID"
                  onChange={(e) => setFamilyId(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth (yyyy-mm-dd)"
                  name="dob"
                  autoComplete="yyyy-mm-dd"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="job"
                  label="Job"
                  name="job"
                  autoComplete="Job"
                  onChange={(e) => setJob(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="jobLocation"
                  label="Work Address"
                  name="jobLcoation"
                  autoComplete="Work Address"
                  onChange={(e) => setJobLocation(e.target.value)}
                  autoFocus
                />

                <Button
                  onClick={addPersonHandler}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  SAVE
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const viewPerson = (
    <div>
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        { } <Button
          onClick={() => setCurrentWindow("menu")}
          type="submit"
          style={{ minWidth: "5%" }}
          variant="contained"
          color="green"
          className={classes.submit}
        >
          Back
        </Button>
        <br />
        <br />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Grid component="main" className={classes.root}>
          <CssBaseline />

          <Grid>
            <div>
              <form className={classes.form} noValidate>
                <Typography component="h1" variant="h5">
                  View Details
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="ID"
                  label="NIC"
                  name="NIC"
                  autoComplete="National Identity Number"
                  autoFocus
                  onChange={(e) => setFindNic(e.target.value)}
                />
                <Button
                  onClick={getPersonDetailHandler}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  View
                </Button>
              </form>
            </div>
            <Grid className={classes.paper}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="NIC"
                          disabled
                          id="nic"
                          value={personDetail == {} ? "" : personDetail.nic}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Full Name"
                          id="name"
                          value={personDetail == {} ? "" : personDetail.name}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Address"
                          id="address"
                          value={personDetail == {} ? "" : personDetail.address}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Family ID"
                          id="familyId"
                          value={personDetail == {} ? "" : personDetail.familyId}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Date of Birth"
                          id="dateOfBirth"
                          value={personDetail == {} ? "" : personDetail.dateOfBirth}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                      {/* fetch() */}

                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Job"
                          id="job"
                          value={personDetail == {} ? "" : personDetail.job}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                      {/* fetch() */}

              
                      <GridItem xs={15} sm={12} md={5}>
                        {/* fetch() */}
                        <CustomInput
                          labelText="Work Address"
                          fullWidth
                          id="jobLocation"
                          value={personDetail == {} ? "" : personDetail.jobLocation}
                          formControlProps={{
                            fullWidth: true,focused:true
                          }}
                        />
                      </GridItem>
                      {/* fetch() */}

                    </GridContainer>
              </GridItem>
            </GridContainer>
          </Grid>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );

  const viewP = (
    <div>

    </div>
  );
  return (
    <div>
      {currentWindow === "menu" ? (<div>{menu}</div>) : (currentWindow == "addPerson" ? (<div>{addPerson}</div>) : (<div>{viewPerson}</div>))}
    </div>
  );
}
