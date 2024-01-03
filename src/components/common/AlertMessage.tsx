
import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Box, Typography} from "@mui/material";
import { makeStyles } from "tss-react/mui";



const useStyles = makeStyles()((theme) => {
  return {
    alert: {
     fontSize: 60,
     height:"40px",
     alignItems: 'center',
     justifyContent: 'center'
    },
  };
});


export default function AlertMessage({
  open,
  handleClose,
  severity,
  message,
}:any) {
  const { classes } = useStyles();
  return (
    <Box>
        <Collapse in={open}>
        <Alert severity={severity} className={classes?.alert} sx={{fontSize:"large" }} onClose={handleClose} ></Alert>
           <Alert color={severity} icon={false} sx={{fontSize:25, justifyContent:"center"}}>{severity} !</Alert>
        <Alert severity={severity} sx={{fontSize:18, textAlign:"center"}} icon={false}>{message}</Alert>
      </Collapse>
    </Box>
  );
}