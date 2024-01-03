import { styled } from "@mui/material/styles";
import { AccordionSummary } from "@mui/material";
const StyledAccordianSummary = styled(AccordionSummary)(({ theme }) => ({
  fontSize: "18px",
  "& .Mui-expanded": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.main,
  },
}));
export default StyledAccordianSummary;
