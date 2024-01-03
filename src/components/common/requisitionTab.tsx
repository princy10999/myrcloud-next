import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  Stack
 
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RequisitionTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%' }} className="Tab-bg">
        <Stack direction={"row"} spacing={2} flexWrap="wrap">
        <Stack direction="column" spacing={4} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="New" {...a11yProps(0)} />
          <Tab label="Accepted" {...a11yProps(1)} />
          <Tab label="Rejected" {...a11yProps(2)} />
        </Tabs>
            </Stack>
        <Box marginLeft="auto" className="Tab-bg-btn">
            <Stack direction="row" spacing={1}>
              <Button size="small" startIcon={<FilterAltOutlinedIcon />}>
                Sort By
              </Button>
              <Button size="small" >
                Salary<ExpandMoreIcon />
              </Button>
              <Button size="small" >
               Priority <ExpandMoreIcon />
              </Button>
              <Button size="small" >
                TAT <ExpandMoreIcon />
              </Button>
            </Stack>
      </Box>
      
        </Stack>
      <TabPanel value={value} index={0}>
      <TableContainer component={Paper}>
      <Table  className='req-table'>
     
        <TableBody>
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
              </TableRow>
            
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TableContainer component={Paper}>
      <Table  className='req-table'>
     
        <TableBody>
       
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
            
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
             
        
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TableContainer component={Paper}>
      <Table  className='req-table'>
     
        <TableBody>
       
             
              <TableRow>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='pri-comp'>
                  <span className='priority'>High</span>
                  <span className='req-id'>Req Id:<span className='req-id-color'>7141</span></span>
                  <span className='date'>5 Aug 2022</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='job'>MIS Controller</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='company'>ArcelorMittal</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap">
                  <span className='city'>Banglore</span>
                </Stack>
                </TableCell>
                <TableCell className='cv-position'>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>No of Position</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={50} /> </span>
                  <span className='date'>1/3</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Cv Limit</span>
                  <span className='req-bar' >  <BorderLinearProgress variant="determinate" value={70} /> </span>
                  <span className='date'>7/10</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Salary</span>
                  <span className='date'>5-10 Lacs</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='position'>Exp</span>
                  <span className='date'>5-10 yrs</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" >
                  <span className='skill'>Skills Required</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='skill-tech' >
                  <span className='skills'>Product Manager</span>
                  <span className='skills'>Analytics</span>
                  <span className='skills'>Data Science</span>
                </Stack>
                </TableCell>
                <TableCell>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Tentantive Closure</span>
                  <span className='percent'>0.2%</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><AccessTimeIcon/></span>
                  <span className='tentetive'>Expected TAT</span>
                  <span className='percent'>20 Days</span>
                </Stack>
                <Stack direction={"row"} spacing={2} flexWrap="wrap" className='timeline' >
                  <span className='icon-time'><CurrencyRupeeIcon/></span>
                  <span className='tentetive'>Estimated Referal</span>
                  <span className='percent'>5800</span>
                </Stack>
                </TableCell>
               
              
                <TableCell>
                  <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                  <span className='icon-time'><VisibilityIcon/></span>
                 </Stack>
                 <Stack direction={"row"} spacing={2} flexWrap="wrap" className='view' >
                 <span className='percent'>View Requisition To Accept</span>
                 </Stack>
                </TableCell>
               
              
               
              </TableRow>
           
        
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
    
    </Box>
  );
}
