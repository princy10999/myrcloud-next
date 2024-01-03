import CustomDrawer from "@components/common/CustomDrawer";
import { IconWrapper } from "@components/common/customSvgIcon";
import StyledTableCell from "@components/common/styledTableCell";
import StyledTableRow from "@components/common/styledTableRow";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ViewCandidateDetialsDrawer from "./viewCandidateDetialsDrawer";

const columns = [
  {
    field: "candidateDetails",
    headerName: "Candidate Details",
    width: "300px",
  },
  { field: "sourcedBy", headerName: "Sourced By", width: "150px" },
  { field: "ageing", headerName: "Ageing", width: "90px" },
  {
    field: "expectedCTC",
    headerName: "Expected Salary",
    type: "number",
    width: "110px",
  },
  {
    field: "noticePeriod",
    headerName: "Notice Period",
    type: "number",
    width: "100px",
  },
  {
    field: "skillMatch",
    headerName: "Skill Match",
    type: "number",
    width: "90px",
  },
  {
    field: "compatiblity",
    headerName: "Compatibility score",
    type: "number",
    width: "90px",
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: "100px",
  },
  {
    field: "actions",
    headerName: "",
    type: "number",
    width: "150px",
  },
];

const rows = [
  {
    userImage: "/static/images/avatar/1.jpg",
    userName: "Robert Fox",
    reqId: "00156",
    email: "robertfox@gmail.com",
    phone: "+91- 9004 7766 33",
    sourcedBy: "Techneel Services",
    sourcedOn: "02 Oct 2022",
    ageing: "2 days",
    expectedCTC: "35,00,000",
    noticePeriod: "45 days",
    skillMatch: "90%",
    compatiblity: "89%",
    rating: 3,
  },
  {
    userImage: "/static/images/avatar/1.jpg",
    userName: "Robert Fox",
    reqId: "00156",
    email: "robertfox@gmail.com",
    phone: "+91- 9004 7766 33",
    sourcedBy: "Techneel Services",
    sourcedOn: "02 Oct 2022",
    ageing: "2 days",
    expectedCTC: "35,00,000",
    noticePeriod: "45 days",
    skillMatch: "90%",
    compatiblity: "89%",
    rating: 3,
  },
  {
    userImage: "/static/images/avatar/1.jpg",
    userName: "Robert Fox",
    reqId: "00156",
    email: "robertfox@gmail.com",
    phone: "+91- 9004 7766 33",
    sourcedBy: "Techneel Services",
    sourcedOn: "02 Oct 2022",
    ageing: "2 days",
    expectedCTC: "35,00,000",
    noticePeriod: "45 days",
    skillMatch: "90%",
    compatiblity: "89%",
    rating: 3,
  },
  {
    userImage: "/static/images/avatar/1.jpg",
    userName: "Robert Fox",
    reqId: "00156",
    email: "robertfox@gmail.com",
    phone: "+91- 9004 7766 33",
    sourcedBy: "Techneel Services",
    sourcedOn: "02 Oct 2022",
    ageing: "2 days",
    expectedCTC: "35,00,000",
    noticePeriod: "45 days",
    skillMatch: "90%",
    compatiblity: "89%",
    rating: 3,
  },
  {
    userImage: "/static/images/avatar/1.jpg",
    userName: "Robert Fox",
    reqId: "00156",
    email: "robertfox@gmail.com",
    phone: "+91- 9004 7766 33",
    sourcedBy: "Techneel Services",
    sourcedOn: "02 Oct 2022",
    ageing: "2 days",
    expectedCTC: "35,00,000",
    noticePeriod: "45 days",
    skillMatch: "90%",
    compatiblity: "89%",
    rating: 3,
  },
];

export default function CandidateListTableView() {
  const [showCandidateDetails, setShowCandidateDetails] =
    useState<boolean>(false);
  return (
    <Box margin={2}>
      <TableContainer>
        <Table sx={{ minHeight: "400px" }}>
          <TableHead>
            <StyledTableRow>
              {columns.map((item, index) => {
                return (
                  <StyledTableCell
                    padding="normal"
                    align={index == 0 ? "left" : "center"}
                    size="small"
                    key={index}
                    width={item.width}
                  >
                    {item.headerName}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <StyledTableRow
                  key={index}
                >
                  <StyledTableCell
                    align={"left"}
                    size="small"
                    key={index}
                    onClick={() => {
                      setShowCandidateDetails(true);
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <Avatar src={row.userImage}></Avatar>
                      <Stack direction={"column"} marginLeft={2}>
                        <Typography variant="subtitle2" fontWeight={"bold"}>
                          {row.userName}
                        </Typography>
                        <Typography variant="caption">
                          {"Requisition ID: " + row.reqId}
                        </Typography>
                        <Typography variant="caption" color={"textSecondary"}>
                          {row.phone + " | " + row.email}
                        </Typography>
                      </Stack>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography variant="subtitle2">{row.sourcedBy}</Typography>
                    <Typography fontSize={"10px"} color={"textSecondary"}>
                      {row.sourcedOn}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography variant="subtitle2">{row.ageing}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography variant="subtitle2">
                      {row.expectedCTC}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography variant="subtitle2">
                      {row.noticePeriod}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={"bold"}
                      color={"primary"}
                    >
                      {row.skillMatch}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={"bold"}
                      color={"primary"}
                    >
                      {row.compatiblity}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Rating value={row.rating} readOnly></Rating>
                  </StyledTableCell>
                  <StyledTableCell align={"center"} size="small" key={index}>
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                      <IconButton
                        sx={{
                          height: "26px",
                          width: "26px",
                          backgroundColor: (theme) =>
                            theme.palette.bgTrendGreen.main,
                          fontSize: "14px",
                        }}
                      >
                        <IconWrapper
                          fontSize="inherit"
                          icon="visibility"
                          color="primary"
                        />
                      </IconButton>
                      <IconButton
                        sx={{
                          height: "26px",
                          width: "26px",
                          backgroundColor: (theme) =>
                            theme.palette.bgLightGray.main,
                          fontSize: "14px",
                        }}
                        // onClick={()=>{
                        //   setShowCandidateDetails(true)
                        // }}
                      >
                        <IconWrapper
                          fontSize="inherit"
                          icon="next-arrow"
                          color="primary"
                        />
                      </IconButton>
                      <IconButton
                        sx={{
                          height: "26px",
                          width: "26px",
                          backgroundColor: (theme) =>
                            theme.palette.bgLightGray.main,
                          fontSize: "14px",
                        }}
                      >
                        <IconWrapper
                          fontSize="inherit"
                          icon="wrong"
                          color="error"
                        />
                      </IconButton>
                      <IconButton
                        sx={{
                          height: "26px",
                          width: "26px",
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          color: (theme) => theme.palette.bgWhite.main,
                          fontSize: "17px",
                        }}
                      >
                        <IconWrapper
                          fontSize="inherit"
                          icon="menu-dots"
                          color="inherit"
                        />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showCandidateDetails ? (
        <ViewCandidateDetialsDrawer
          open={showCandidateDetails}
          handleClose={() => {
            setShowCandidateDetails(false);
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
}
