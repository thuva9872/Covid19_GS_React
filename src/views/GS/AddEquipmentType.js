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

export default function Login() {
  

  const classes = useStyles();
  const [userType, setUserType] = React.useState('');
  const handleChange = (event) => {
    setUserType(event.target.value);
    console.log(userType)
  };

  const addEquipTypeHandler=async()=>{
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({type:type,brand:brand})
    };
    // console.log(requestOptions);
    await fetch(process.env.REACT_APP_API+'/admin/addEquipType',requestOptions)
       .then(response => response.json())
      .then(data=>{
        if (data.title=="Success"){
          alert("Succesfuly added");
          setType("");
          setBrand("");
        }
  
      }).catch(e=>setResponse("Failed"));
  }
  // console.log(data);
  const [response,setResponse]=useState();
  const [type,setType]=useState();
  const [brand,setBrand]=useState();
  

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
              id="type"
              label="Type"
              name="type"
              value={type}
              onChange={e=>setType(e.target.value)}
              autoComplete="type"
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
              value={brand}
              id="brand"
              label="Brand"
              name="brand"
              onChange={e=>setBrand(e.target.value)}
              autoComplete="brand"
              autoFocus
              required 
              // values={values.email}
            />
           
           

            
            

           <Button variant="contained"  color="light blue" size="small" onClick={addEquipTypeHandler} className={classes.button} startIcon={<SaveIcon />}>
        Submit
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



