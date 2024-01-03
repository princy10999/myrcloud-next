import { styled } from "@mui/material/styles";
import { Accordion, AccordionSummary } from "@mui/material";
const StyledAccordian = styled(Accordion)(({ theme }) => ({
  marginBottom:"12px",
  
  "& .Mui-expanded": {
    color: theme.palette.primary.main,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.main,
  },
}));
export default StyledAccordian;

const StyledAccordianSummary = styled(AccordionSummary)(({ theme }) => ({
  marginBottom:"12px",
  borderBottom: "1px solid",
  
  "& .Mui-expanded": {
    color: theme.palette.primary.main,
    
    borderBottom: "1px solid",
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.main,
  },
}));

