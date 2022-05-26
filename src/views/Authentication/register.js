import React,{useState} from 'react';
import { Avatar, Button, CssBaseline, TextField,  Paper, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import useStyles from './style';
//added newly
import PropTypes from 'prop-types';
import useToken from "../../useToken";
import loginImage from "../../assets/img/loginImg.jpg";
import { WindowSharp } from '@mui/icons-material';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  

  const classes = useStyles();

  async function registerHandler() {
    if (nic && username && password && repeatPassword) {
      if (password !== repeatPassword) {
        alert("Password does not match");
        throw new Error();
      }
      axios
        .post(process.env.REACT_APP_API + "/auth/signup", {
          nic,
          username,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            setResponse(true);
          }
        })
        .catch((e = alert("Username not available")));
    } else {
      alert("Fill all the fields");
    }
  }
  // console.log(response);
  const [nic,setNic]=useState();
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const [repeatPassword,setRepeatPassword]=useState();
  const [response,setResponse]=useState();

  if(response){
    return <Redirect to="/" />
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate >
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
              onChange={(e)=>setNic(e.target.value)}              
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
              onChange={(e)=>setUsername(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
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
              onChange={(e)=>setRepeatPassword(e.target.value)}
              autoFocus
            />      
          

            <Button
              onClick={registerHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Link to="/" className="btn btn-primary" >
            <Button
            //   onSubmit={handleSubmit}
              type="submit"
              style={{minWidth:"20px"}}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Back to Login
            </Button>
            {/* submit */}
            </Link>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}

