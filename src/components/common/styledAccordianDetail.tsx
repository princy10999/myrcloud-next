import { styled } from "@mui/material/styles";
import { AccordionDetails } from "@mui/material";
const StyledAccordianDetails = styled(AccordionDetails)(({ theme }) => ({
  marginBottom: "12px",
  borderTop: "1px solid",
  borderColor: theme.palette.bgLightGray.main,
  "& .Mui-expanded": {
    color: theme.palette.primary.main,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.main,
  },
}));
export default StyledAccordianDetails;
