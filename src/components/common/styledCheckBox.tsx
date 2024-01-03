import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Checkbox } from "@mui/material";
const StyledCheckboxPrimaryBorder = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.primary.main,
}));
export default StyledCheckboxPrimaryBorder;
