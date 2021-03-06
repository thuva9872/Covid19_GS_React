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
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
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

export default function Pharmacy() {

  const classes = useStyles();

  async function addPharmacyHandler() {
    axios
      .post(process.env.REACT_APP_API + "/gs/addPharmacy", {
        name,
        address,
        location,
        openingTime,
        closingTime,
      }, { headers: { 'Authorization': "Bearer " + token } })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setCurrentWindow("menu")
        }
      })
      .catch(e => alert("Invalid data"));
  }

  async function getPharmacyHandler() {
    axios.get(process.env.REACT_APP_API + "/gs/getPharmacies/", { headers: { 'Authorization': "Bearer " + token } }).then((response) => {
      if (response.status === 200) {
        setPharmacies(response.data)
      }
      else {
        alert("Person not found")
      }
    }).catch(e => alert(e))
  }
  const { token, setToken } = useToken();
  const [currentWindow, setCurrentWindow] = useState("menu");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();
  const [location, setLocation] = useState();
  const [markerPosition, setMarkerPosition] = useState();
  const [markerShow, setMarkerShow] = useState(false);
  const [pharmacies, setPharmacies] = useState();
  // console.log(vaccinationDetail);
  const containerStyle = {
    width: '600px',
    height: '600px'
  };

  const center = {
    lat: 7.8731,
    lng: 80.7718
  };
  const position = {
    lat: 7.8731,
    lng: 80.7718
  }

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
            onClick={() => setCurrentWindow("add")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Add New Pharmacy</Button>
          <br />
          <Button
            onClick={() => setCurrentWindow("view")}
            type="submit"
            style={{ minWidth: "5%" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >View Pharmacies</Button>
        </Stack>
      </Container>
    </div>
  );

  const AddPharmacyMap = (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onClick={e => { setMarkerPosition(e.latLng); setLocation(e.latLng.toString()); setMarkerShow(true); }}
        >
          {markerShow && <Marker
            position={markerPosition}
          />}
        </GoogleMap>
      </LoadScript>
    </div>
  );

  const addPharmacyView = (
    <div>
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
                <form className={classes.form} style={{ borderBottom: "2px solid blue" }} noValidate>
                  <Typography component="h1" variant="h5">
                    Add New Pharmacy
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Pharmacy Name"
                    name="name"
                    autoComplete=""
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
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
                    autoComplete=""
                    onChange={(e) => setAddress(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="opningTime"
                    label="Opening Time"
                    name="openingTime"
                    autoComplete=""
                    onChange={(e) => setOpeningTime(e.target.value)}
                    autoFocus
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="closingTime"
                    label="Closing Time"
                    name="closingTime"
                    autoComplete=""
                    onChange={(e) => setClosingTime(e.target.value)}
                    autoFocus
                  />
                  <div>
                    <label>Location</label>
                    <br />
                    {AddPharmacyMap}
                  </div>
                  <br />
                  <Button
                    onClick={addPharmacyHandler}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Add Pharmacy
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
  // console.log(pharmacies);
  const ViewPharmacyMap = (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ width: "1000px", height: "1000px" }}
          center={center}
          zoom={7}
          onLoad={getPharmacyHandler}
        >
          {pharmacies && pharmacies.map(element => {
            if(element.location!=null){let loc = element.location.split(",");
            // console.log(loc);
            let pos = { lat: parseFloat(loc[0].slice(1)), lng: parseFloat(loc[1].slice(0, -1)) }
            // console.log(pos);
            return <Marker id={element.id} position={pos} />}
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );

  const viewPahrmacyView = (
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
      <div>
        {ViewPharmacyMap}
      </div>
    </div>
  )
  return (
    <div>
      {currentWindow === "menu" ? (<div>{menu}</div>) : (currentWindow == "add" ? (<div>{addPharmacyView}</div>) : (<div>{viewPahrmacyView}</div>))}
    </div>
  );
}

