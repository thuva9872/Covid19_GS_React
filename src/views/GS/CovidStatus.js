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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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

export default function CovidStatus() {

  const classes = useStyles();

  async function addCovidHandler() {
    axios
      .post(process.env.REACT_APP_API + "/gs/addCovidStatus", {
        nic,
        reason,
        quarantineStartDate,
        quarantineFinishDate,
      }, { headers: { 'Authorization': "Bearer " + token } })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setCurrentWindow("menu")
        }
      })
      .catch(e => alert("Invalid data"));
  }

  async function getcovidDetailHandler() {
    axios.get(process.env.REACT_APP_API + "/gs/person/" + findNic, { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setPersonDetail(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert("No details found"))
    axios.get(process.env.REACT_APP_API + "/gs/covid19/" + findNic, { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setCovidDetail(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert("No details found"))
  }
  const { token, setToken } = useToken();
  const [nic, setNic] = useState();
  const [reason, setReason] = useState();
  const [quarantineStartDate, setQuarantineStartDate] = useState();
  const [quarantineFinishDate, setQuarantineFinishDate] = useState();
  const [findNic, setFindNic] = useState();
  const [covidDetail, setCovidDetail] = useState({});
  const [personDetail,setPersonDetail]=useState({});
  const [currentWindow, setCurrentWindow] = useState("menu");
  console.log(currentWindow)
  console.log(covidDetail);
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
            onClick={() => setCurrentWindow("addCovid")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Add New COVID19 Status</Button>
          <br />
          <Button
            onClick={() => setCurrentWindow("viewCovid")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >View COVID19 Detail</Button>
        </Stack>
      </Container>
    </div>
  );

  const addCovid = (
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
                  Add New Covid Detail
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
                  label="Reason"
                  name="reason"
                  autoComplete="Reason"
                  onChange={(e) => setReason(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="startDate"
                  label="Quarantine Start Date"
                  name="startDate"
                  autoComplete=""
                  onChange={(e) => setQuarantineStartDate(e.target.value)}
                  autoFocus
                />

                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="finishDate"
                  label="Quarantine Finish Date"
                  name="finishDate"
                  autoComplete=""
                  onChange={(e) => setQuarantineFinishDate(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={addCovidHandler}
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
   if (covidDetail){
    for (let i=0;i<covidDetail.length;i++){
      rows[i]={
      id:i,
      ID:i+1,
      ID:covidDetail[i].recordId,
      reason:covidDetail[i].reason,
      quarantineStartDate:covidDetail[i].quarantineStartDate,
      quarantineFinishDate:covidDetail[i].quarantineFinishDate
      }
    }
  }     
  const viewCovid = (
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
                  View Covid Details
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
                  onClick={getcovidDetailHandler}
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
                          focused: true
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
                    <h4 className={classes.cardTitleWhite}>Covid History Table</h4>

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
      {currentWindow === "menu" ? (<div>{menu}</div>) : (currentWindow == "addCovid" ? (<div>{addCovid}</div>) : (<div>{viewCovid}</div>))}
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
    field: 'reason',
    headerName: 'Reason',
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: 'quarantineStartDate',
    headerName: 'Quarantine Start Date',
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: 'quarantineFinishDate',
    headerName: 'Quarantine Finish Date',
    flex: 0.5,
    minWidth: 130,
  }
]