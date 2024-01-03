import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.bgWhite.main,
  borderBottom: "12px solid "+theme.palette.bgLightGray.main,
  borderCollapse: "separate",
  borderSpacing: "0 10px",
  marginTop: "-10px",
  ".MuiTableRow-root": {
    borderRadius: "5px",
    // marginTop:"12px",
  },
}));
export default StyledTableRow;
