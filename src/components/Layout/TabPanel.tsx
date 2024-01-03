import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material";
import TabPanel from "@components/common/tabPanelComponent";
import { Box, Grid, Stack,Chip,Typography } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from '@components/common/customSvgIcon';

const useStyles = makeStyles()((theme) => {
    return {
      tab1:{
       display:'flex',
       justifyContent:"space-between",
       minHeight: "38px",
       borderRadius: '5px',
       borderBottomLeftRadius: 0,
       borderBottomRightRadius: 0,
       color:"#FFFFFF",
      },
      tab2:{
        display:'flex',
        alignItems:"flex-start",
        minHeight: "38px",
        borderRadius: '5px',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        color:"#777777",
       },
    };
  });
  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
export default function TabPanelComponent({value,setValue}:any) {
    const theme = useTheme();
    const { classes } = useStyles();
  // const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  
  return (
    <>
      <Box>
      <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            textColor="inherit"
            // indicatorColor="none"
          >
            <Tab label="Add Candidate"   {...a11yProps(0)} className={classes.tab1} iconPosition="end" icon={<IconWrapper fontSize="5px" icon="next" />} sx={{ bgcolor: "#1BA39C"}} />
            <Tab label="Create Requisition" {...a11yProps(1)} className={classes.tab2} sx={{ bgcolor: "#FFFFFF"}} />
          </Tabs>
      </Box>
    </>
  );
}
