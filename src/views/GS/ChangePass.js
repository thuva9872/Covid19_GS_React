import React,{useState} from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import useStyles from '../Authentication/style';
//added newly
import PropTypes from 'prop-types';
import useToken from "../../useToken";
import loginImage from "../../assets/img/loginImg.jpg";
import { WindowSharp } from '@mui/icons-material';
import SaveIcon from '@material-ui/icons/Save';
export default function changePass() {
  

  const classes = useStyles();
  const [userType, setUserType] = React.useState('');
  const handleChange = (event) => {
    setUserType(event.target.value);
    console.log(userType)
  };

  const changePassHandler=async()=>{
    // e.preventDefault();
   if(newPass==confirmPass){ 
       const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({currentPass:currentPass,newPass:newPass})
    };
    await fetch(process.env.REACT_APP_API+'/admin/changePass',requestOptions)
       .then(response => response.json())
      .then(async(data)=>{
        if (data.title=="Success"){
          alert("Succesfuly Changed");
          setToken("");
          await fetch(process.env.REACT_APP_API+"/auth/logout",{credentials:'include'});
          window.location.replace("/");        }
      }).catch(e=>alert("Failed"));
    }
    else alert("Password does not match!!!")
  }
  // console.log(data);
  const [currentPass,setCurrentPass]=useState();
  const [newPass,setNewPass]=useState();
  const [confirmPass,setConfirmPass]=useState();
  const {token,setToken}=useToken();

  return (
    <Grid container component="main" >
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <form className={classes.form} noValidate >
        
        <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="currentPass"
              label="Current Password"
              name="currentPass"
              value={currentPass}
              onChange={e=>setCurrentPass(e.target.value)}
              autoComplete="Current Password"
              autoFocus
              required 
              // values={values.email}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={newPass}
              id="newPass"
              label="New Password"
              name="newPass"
              onChange={e=>setNewPass(e.target.value)}
              autoComplete="New Password"
              autoFocus
              required 
              // values={values.email}
            />
                <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={confirmPass}
              id="confirmPass"
              label="Confirm Password"
              name="confirmPass"
              onChange={e=>setConfirmPass(e.target.value)}
              autoComplete="Confirm Password"
              autoFocus
              required 
              // values={values.email}
            />
           

            
            

           <Button variant="contained"  color="light blue" size="small" onClick={changePassHandler} className={classes.button} startIcon={<SaveIcon />}>
        Change Password
      </Button>
            

          </form>
          {/* <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          
        </div>
      </Grid>
    </Grid>
    
  );
}



