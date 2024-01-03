import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import ButtonContained from "@components/Layout/ButtonContained";
import DropDownComponent from "@components/Layout/DropDownComponent";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import PaperContainer from "@components/common/paperContainer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 17,
    fontWeight: 500,
    textAlign: "left",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.bgLightGray.main,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableData = [
  {
    id: 1,
    idnum: "7141",
    requisitionDetails: "Store manager Assistant Store DMart India, Bangalore",
    promotionContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the  more...",
    date: "05-Aug-2022 to 15-Aug-2022",
  },
  {
    id: 2,
    idnum: "7584",
    requisitionDetails:
      "Regional Account Manager Lithium Urban Technologies,Delhi, Mumbai, Petamitta",
    promotionContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the  more...",
    date: "05-Aug-2022 to 15-Aug-2022",
  },
  {
    id: 3,
    idnum: "7141",
    requisitionDetails: "Store manager Assistant Store DMart India, Bangalore",
    promotionContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the  more...",
    date: "05-Aug-2022 to 15-Aug-2022",
  },
  {
    id: 4,
    idnum: "7584",
    requisitionDetails:
      "Regional Account Manager Lithium Urban Technologies,Delhi, Mumbai, Petamitta",
    promotionContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the  more...",
    date: "05-Aug-2022 to 15-Aug-2022",
  },
  {
    id: 5,
    idnum: "7141",
    requisitionDetails: "Store manager Assistant Store DMart India, Bangalore",
    promotionContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the  more...",
    date: "05-Aug-2022 to 15-Aug-2022",
  },
];
export default function Promotion() {
  //Hooks
  const theme = useTheme();
  //State
  const [data, setData] = React.useState<any>({
    requisiton: "",
    startDate: "",
    endDate: "",
    promotionContent: "",
  });
  //Handler
  const handleChange = (event: any, newValue: any) => {
    console.info("You clicked the Chip.");
  };
  const searchFilter = (event: any, newValue: any) => {
    console.info("search.");
  };
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const select = ["Requisition Promotion", "Promotion Banner"];
  const requisitons = ["1", "2", "3", "4"];

  return (
    <>
      <Box display={{ md: "flex" }} justifyContent={"space-between"}>
        <Stack>
          <Typography fontSize="22px" fontWeight={600}>
            Promotion
          </Typography>
        </Stack>
        <Box display={"flex"} width={"300px"}>
          <DropDownComponent
            width="100%"
            values={select}
            name="select"
            defaultValue={"Requisition Promotion"}
            labelSize={"16px"}
            fontWeight={400}
            labelColor={theme.palette.bgBlack.main}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <PaperContainer elevation={0} sx={{ p: 2, mt: 1 }}>
        <Grid item container gap={1}>
          <Grid md={6} xs={12}>
            <DropDownComponent
              width="100%"
              text="Select Requisition *"
              values={requisitons}
              name="role"
              defaultValue={"Select"}
              labelSize={"14px"}
              value={data?.requisiton}
              onChange={handleChangeInput}
              valid
            />
          </Grid>
          <Grid md={3} xs={12}>
            <TextFieldComponent
              type="date"
              text="Start Date"
              width="100%"
              name="startDate"
              value={data?.startDate}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid md={3} xs={12}>
            <TextFieldComponent
              type="date"
              text="End Date"
              width="100%"
              name="endDate"
              value={data?.endDate}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid md={12} xs={12}>
            <TextFieldComponent
              type="text"
              text="Promotion Content"
              width="100%"
              name="promotionContent"
              value={data?.promotionContent}
              onChange={handleChangeInput}
              labelSize={"14px"}
              multiline
              rows={3}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
        </Grid>
      </PaperContainer>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography fontSize="22px" fontWeight={600}>
          Promotion Table
        </Typography>
        <SearchTextFieldComponents
          placeholder={"Search"}
          onChange={searchFilter}
        />
      </Box>
      <Grid item container lg={12} md={12} xs={12}>
        <Box bgcolor={"white"} mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "5%" }}>#</StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>
                  Requisition ID
                </StyledTableCell>
                <StyledTableCell sx={{ width: "25%" }}>
                  Requisition Details
                </StyledTableCell>
                <StyledTableCell sx={{ width: "35%" }}>
                  Promotion Content
                </StyledTableCell>
                <StyledTableCell sx={{ width: "20%" }}>Date</StyledTableCell>
                <StyledTableCell sx={{ width: "10%" }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell>{item.idnum}</StyledTableCell>
                  <StyledTableCell>{item.requisitionDetails}</StyledTableCell>
                  <StyledTableCell>{item.promotionContent}</StyledTableCell>
                  <StyledTableCell>{item.date}</StyledTableCell>
                  <StyledTableCell>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <IconWrapper fontSize="19px" icon="edit" />
                      <IconWrapper fontSize="19px" icon="delete" />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </>
  );
}
