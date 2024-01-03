import { styled } from "@mui/material/styles";
import { TableCell, tableCellClasses, TableRow } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        fontWeight:"bold",
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
}));
export default StyledTableCell;
