import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "react-responsive-modal/styles.css";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
  import {InputLabel,TextField,Paper} from '@mui/material/';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from "react";





const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 200,
    borderRadius:"5px",
    // height: "100px",
    backgroundColor: "white",
    border: '2px solid blue',
    //boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
  },
}));

const styles = {
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  
};

// const useStyles = makeStyles(styles);



export default function TableList() {
  const [open,setOpen]=React.useState(false);
  const [labID, setLabID] = React.useState('');
  const[techID,setTechID]=React.useState('');
  const handleLabChange = (event) => {
    setLabID(event.target.value);
  };
  const handleTechChange = (event) => {
    setTechID(event.target.value);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


  const classes = useStyles();
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };
 
  const assignHandler =async ()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({labId:labID,T_OId:techID})
    };
    // console.log(requestOptions);
    await fetch(process.env.REACT_APP_API+'/admin/assignTO',requestOptions)
       .then(response => response.json())
      .then(data=>{
        if (data.title=="Success"){
          alert("Assigned successfully")
        }
        else{
          alert("Failed")
        }
      }).catch(e=>alert("Failed"));
      setLabID("");
      setTechID("");
  }

  // const handleEdit=()=>{
  //   window.location.replace("/lecturer/lecturers/edit/1")
  // }
  const [TOs,setTOs]=useState();
  const [labs,setLabs]=useState();

  useEffect(()=>{
    fetch(process.env.REACT_APP_API+'/admin/getTOs',{credentials:'include'})
     .then(response => response.json())
    .then(data=>setTOs(data.msg))
    .catch(e=>console.log(e));


    fetch(process.env.REACT_APP_API+'/admin/getLabs',{credentials:'include'})
     .then(response => response.json())
    .then(data=>setLabs(data.msg))
    .catch(e=>console.log(e));

  },[])

  return (
    <div>
   


    <GridContainer>
      <GridItem xs={12} sm={12} md={5}component={Paper} elevation={6} square>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Assign Technical officer </h4>
          
          </CardHeader>
          <CardBody>
         
      <FormControl sx={{ m: 1, minWidth: 370 }} >
        <InputLabel id="demo-simple-select-readonly-label">Lab ID</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={labID}
          label="Lab ID"
          onChange={handleLabChange}
         
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {labs && labs.map((lab)=><MenuItem key={lab.lab_id} value={lab.lab_id}>{lab.name+" ("+lab.lab_id+")"}</MenuItem>)}

        </Select>
       
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 370 }} >
        <InputLabel id="demo-simple-select-error-label">Tech ID</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={techID}
          label="Tech ID"
          onChange={handleTechChange}
         
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {TOs && TOs.map((to)=><MenuItem key={to.user_id} value={to.user_id}>{to.first_name +" "+to.last_name}</MenuItem>)}
    
        </Select>
       
      </FormControl>
      
      
        
                
      
              
      <Button
            //   onSubmit={handleSubmit}
            onClick={assignHandler}
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              className={classes.submit}
            >
              Submit
            </Button>
  
           
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  
      
    </div>
  );
}







