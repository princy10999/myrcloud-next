import { styled } from "@mui/material";
import { Tabs } from "@mui/material";
import React from "react";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .Mui-selected": {
    fontWeight: "bold",
    
  },
  
}));
export default StyledTabs;
