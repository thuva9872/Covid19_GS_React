import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import "react-responsive-modal/styles.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Typography } from "@material-ui/core";
import axios from "axios";
import useToken from "useToken";
import { Label } from "@material-ui/icons";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: "100%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    border: "2px solid blue",
    // borderLeft: "2px solid blue",
    // borderBottom: "2px solid blue",
    //boxShadow: theme.shadows[1],
    padding: theme.spacing(6, 4, 3),
  },
  form: {
    position: "relative",
    width: "100%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    borderTop: "2px solid blue",
    borderRight: "2px solid blue",
    borderLeft: "2px solid blue",

    //boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 4, 3),
  },
  table: {
    // position: "relative",
    width: "100%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    // borderTop: "2px solid blue",
    // borderRight: "2px solid blue",
    // borderLeft: "2px solid blue",

    //boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 4, 3),
  },
}));

export default function Vaccination() {

  const classes = useStyles();

  async function addVaccinationHandler() {
    axios
      .post(process.env.REACT_APP_API + "/gs/addVaccinationInfo", {
        nic,
        vaccineName,
        vaccinationAddress,
        vaccinationDate,
      }, { headers: { 'Authorization': "Bearer " + token } })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setCurrentWindow("menu")
        }
      })
      .catch(e => alert("Invalid data"));
  }

  async function getVaccinationDetailHandler() {
    axios.get(process.env.REACT_APP_API + "/gs/person/" + findNic, { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setPersonDetail(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert(e))
    axios.get(process.env.REACT_APP_API + "/gs/vaccination/" + findNic, { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setVaccinationDetail(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert(e))
  }
  const { token, setToken } = useToken();
  const [nic, setNic] = useState();
  const [vaccineName, setVaccineName] = useState();
  const [vaccinationAddress, setVaccinationAddress] = useState();
  const [vaccinationDate, setVaccinationDate] = useState();
  const [findNic, setFindNic] = useState();
  const [vaccinationDetail, setVaccinationDetail] = useState({});
  const [personDetail,setPersonDetail]=useState({});
  const [currentWindow, setCurrentWindow] = useState("menu");
  console.log(currentWindow)
  console.log(vaccinationDetail);
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
            onClick={() => setCurrentWindow("addVaccination")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Add New Vaccination Detail</Button>
          <br />
          <Button
            onClick={() => setCurrentWindow("viewVaccination")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >View Vaccination Detail</Button>
        </Stack>
      </Container>
    </div>
  );

  const addVaccination = (
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
              <form className={classes.form} style={{borderBottom:"2px solid blue"}} noValidate>
                <Typography component="h1" variant="h5">
                  Add Vaccination Detail
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
                  id="vaccineName"
                  label="Vaccine Name"
                  name="vaccineName"
                  autoComplete=""
                  onChange={(e) => setVaccineName(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="vaccinationAddress"
                  label="Vaccination Address"
                  name="vaccinationAddress"
                  autoComplete=""
                  onChange={(e) => setVaccinationAddress(e.target.value)}
                  autoFocus
                />

                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="vacciantionDate"
                  label="Vaccination Date"
                  name="vaccinationDate"
                  autoComplete=""
                  onChange={(e) => setVaccinationDate(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={addVaccinationHandler}
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
   var rows=[]
   if (vaccinationDetail){
    for (let i=0;i<vaccinationDetail.length;i++){
      rows[i]={
      id:i,
      ID:i+1,
      ID:vaccinationDetail[i].recordId,
      vaccineName:vaccinationDetail[i].vaccineName,
      vaccinationAddress:vaccinationDetail[i].vaccinationAddress,
      vaccinationDate:vaccinationDetail[i].vaccinationDate
      }
    }
  }     
  const viewVaccination = (
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
                  View Vaccination Details
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
                  onClick={getVaccinationDetailHandler}
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
                    <GridItem >
                      {/* fetch() */}
                      <CustomInput
                        labelText="NIC"
                        disabled
                        id="nic"
                        value={personDetail == {} ? "" : personDetail.nic}
                        formControlProps={{
                          fullWidth: true, focused: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem >
                      {/* fetch() */}
                      <CustomInput
                        labelText="Full Name"
                        id="name"
                        value={personDetail == {} ? "" : personDetail.name}
                        formControlProps={{
                          fullWidth: true, focused: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem >
                      {/* fetch() */}
                      <CustomInput
                        labelText="Address"
                        id="address"
                        value={personDetail == {} ? "" : personDetail.address}
                        formControlProps={{
                          fullWidth: true, focused: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.table}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Vaccination Table</h4>

                  </CardHeader>
                  <CardBody>
                    <div style={{ height: 450, width: '100%' }}>
                      <DataGrid rows={rows} columns={columns} />
                    </div>
                  </CardBody>
                </Card>
              </GridItem>

            </GridContainer>
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
      {currentWindow === "menu" ? (<div>{menu}</div>) : (currentWindow == "addVaccination" ? (<div>{addVaccination}</div>) : (<div>{viewVaccination}</div>))}
    </div>
  );
}

const columns = [

  {
    field: 'ID',
    headerName: 'ID',
    flex: 0.5,
    minwidth: 100,

  },
  {
    field: 'vaccineName',
    headerName: 'Vaccination Name',
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: 'vaccinationAddress',
    headerName: 'Vaccination Address',
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: 'vaccinationDate',
    headerName: 'Vaacination Date',
    flex: 0.5,
    minWidth: 130,
  }
]