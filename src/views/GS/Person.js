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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: 200,
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    border: "2px solid blue",
    //boxShadow: theme.shadows[1],
    padding: theme.spacing(6, 4, 3),
  },
  form: {
    position: "relative",
    width: "60%",
    borderRadius: "5px",
    // height: "100px",
    backgroundColor: "white",
    border: "2px solid blue",
    //boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 4, 3),
  },
}));

export default function Person() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const fetchData = () => {
    fetch(process.env.REACT_APP_API + "/admin/viewUsers/lecturer", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setData(data.msg))
      .catch((e) => console.log(e));
  };
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  var rows = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      rows[i] = {
        id: i,
        ID: i + 1,
        LecturerID: data[i].user_id,
        firstName: data[i].first_name,
        lastName: data[i].last_name,
        Email: data[i].email,
        ContactNo: data[i].contact_no,
      };
    }
  }

  async function addLecturerHandler() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        userType: "lecturer",
        firstName: firstName,
        lastName: lastName,
        userId: userId,
        contactNo: contactNo,
      }),
    };
    // console.log(requestOptions);
    await fetch(process.env.REACT_APP_API + "/admin/addStaff", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        onCloseModal();
        alert(data.message);
      })
      .catch((e) => setResponse("Failed"));

    fetchData();
  }
  console.log(response);
  const [response, setResponse] = useState();
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [contactNo, setContactNo] = useState();

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
          <Button variant="contained">Add new person</Button>
          <br />
          <Button variant="outlined">View details of a person</Button>
        </Stack>
      </Container>
    </div>
  );

  const addPerson = (
    <div>
      <div style={{ alignItems: "center", justifyContent: "center" }}>
       {  } <Button
          //   onSubmit={handleSubmit}
          type="submit"
          style={{ minWidth: "5%" }}
          variant="contained"
          color="primary"
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
              <form className={classes.form} noValidate>
                <Typography component="h1" variant="h5">
                  Sign Up
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
                  // onChange={(e)=>setNic(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="uname"
                  label="User Name"
                  name="username"
                  autoComplete="user name"
                  // onChange={(e)=>setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="Password"
                  // onChange={(e)=>setPassword(e.target.value)}
                  autoFocus
                />

                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="reeatPassword"
                  label="Repeat Password"
                  name="repeatPassword"
                  autoComplete="Repeat Password"
                  // onChange={(e)=>setRepeatPassword(e.target.value)}
                  autoFocus
                />

                <Button
                  // onClick={registerHandler}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign up
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  return <div>{addPerson}</div>;
}
