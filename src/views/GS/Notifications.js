import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
// dataa must be fetched to NotificationData
import dataa from "views/NotificationData";

function Entry(props){
  const [open, setOpen] = React.useState(true);
  return(<div>
    <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Collapse in={open}>
        <Alert severity="info"
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         <AlertTitle>Info</AlertTitle>
         {/* only description has been taken for now */}
        This is an info alert — <strong>{props.description}</strong>
          
        </Alert>
        
      </Collapse>
    </Stack>
    
        
      
    
    </div>);
}
//for now only the description has been taken from dataa
function createEntry(dataa){
  return <Entry
    key={dataa.id}
    description={dataa.notify}
  />
}


export default function DescriptionAlerts(props) {
  
  return (
    
    <div>
    <h1>
      <span>Notifications</span>
    </h1>
    <div>
      {dataa.map(createEntry)}
    </div>

    </div>
    
  );
}

      
     
    

