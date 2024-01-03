import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: theme.palette.primary.main,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.primary.main,
  },
}));
export default StyledRating;
