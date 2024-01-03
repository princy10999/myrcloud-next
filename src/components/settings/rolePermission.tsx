// import React from 'react';
// import {
//     Grid,
//     Stack,
//     Typography,
//     Table,
//     TableHead,
//     TableRow,
//     TableBody,
//     Box,
//     TableContainer,
//     AccordionSummary,
//     Accordion,
//     AccordionDetails,
//     Checkbox,
// } from "@mui/material";
// import { makeStyles } from "tss-react/mui";
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import { styled } from '@mui/material/styles';
// import { IconWrapper } from "@components/common/customSvgIcon";
// import ButtonContained from "@components/Layout/ButtonContained";
// import SearchTextFieldComponents from '@components/Layout/SearchTextFieldComponents';
// import Assets from '@components/common/image_container';
// import TextFieldComponent from '@components/Layout/TextFieldComponent';
// import { classnames } from 'tss-react/tools/classnames';
// import StyledAccordianSummary from '@components/common/styledAccordianSummary';
// import StyledAccordian from '@components/common/styledAccordian';
// import StyledAccordianDetails from '@components/common/styledAccordianDetail';

// const useStyles = makeStyles()((theme) => {
//     return {
//         main: {
//             backgroundColor: "#CCCCCC",
//         },
//         tableTitle: {
//             fontSize: '18px',
//             fontWeight: "500px",
//             textAlign: "center",
//             color: theme.palette.bgBlack.main,
//         }
//     };
// });
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.white,
//         fontSize: 18,
//         fontWeight: 500,
//         '&:nth-of-type(1)': {
//             textAlign: "left"
//         },
//         '&:nth-of-type(3)': {
//             borderRight: "1px solid lightgray"
//         },
//     },
//     [`&.${tableCellClasses.body}`]: {
//         textAlign: "center",
//         '&:nth-of-type(1)': {
//             textAlign: "left"
//         },
//         '&:nth-of-type(3)': {
//             borderRight: "1px solid lightgray"
//         },
//     },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.bgLightGray.main,
//     },
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// const data = [
//     "Recruitment Agency",
//     "Individual Recruiters",
//     "Admin",
//     "CSM Head",
//     "CSM",
//     "Recruiters",
//     "Operations",
//     "Internal Sourcing Tea",
//     "QC",
//     "PSM Head",
//     "PSM",
// ]

// const mainData = [
//     {
//         title: "Requisition",
//         subTitle: [
//             "CreateRequisition",
//             "Edit Current Requisition",
//             "Requisition Prioritization Changes",
//         ]
//     },
//     {
//         title: "Candidate",
//         subTitle: [
//             "AddCandidate",
//             "ViewCandidate",
//             "EditCandidate",
//         ]
//     },
// ]
// export default function RolePermission() {
//     const { classes } = useStyles();
//     const [expanded, setExpanded] = React.useState<string | false>("panel1");

//     const handleAccordion =
//         (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
//             setExpanded(newExpanded ? panel : false);
//         };
//     return (
//         <>
//             <Box
//                 display={"flex"}
//                 justifyContent={"space-between"} alignItems="center">
//                 <Typography fontSize="22px" fontWeight={600} >Roles and Permissions</Typography>
//                 <Stack
//                     direction={{
//                         lg: "row",
//                         md: "row",
//                         xs: "column",
//                         sm: "row",
//                     }}
//                     alignItems={"center"}
//                     gap={{ lg: 2, md: 2, xs: 1, sm: 1 }}
//                     mt={{ lg: 0, md: 3, xs: 0, sm: 2 }}
//                 >
//                     <IconWrapper icon="search" fontSize='small' color="primary" />
//                     <TextFieldComponent
//                         placeholder="search" className={classes?.main} />
//                     <ButtonContained
//                         borderRadius="24px"
//                         text={"New Role"}
//                         endIcon={<IconWrapper fontSize="19px" icon="plus-symbol" />}
//                     />
//                 </Stack>
//             </Box>
//             <Grid item container lg={12} md={12} xs={12} >
//                 <Box bgcolor={'white'} mt={3} width="100%">
//                     <TableContainer sx={{ maxHeight: 700 }}>
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead>
//                                 <TableRow>
//                                     <StyledTableCell colSpan={1}>Features</StyledTableCell>
//                                     <StyledTableCell className={classes.tableTitle} colSpan={2}>Partner
//                                     </StyledTableCell>
//                                     <StyledTableCell className={classes.tableTitle} colSpan={8}>My Rcloud Team    </StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableHead>
//                                 <TableRow>
//                                     {data?.map((e: any) => {
//                                         return (
//                                             <StyledTableCell>
//                                                 <Typography mt={1} fontSize="14px" fontWeight={700} textAlign="center" color={(theme) => theme.palette.bgGray.main}>{e}</Typography>
//                                             </StyledTableCell>
//                                         )
//                                     })}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {mainData?.map((e: any) => {
//                                     return (
//                                         <TableRow>
//                                             <StyledTableCell >{e?.title}</StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                             <StyledTableCell>
//                                                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
//                                             </StyledTableCell>
//                                         </TableRow>
//                                     )
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             </Grid>
//         </>
//     )
// };

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { Checkbox } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 500,
    "&:nth-of-type(1)": {
      textAlign: "left",
    },
    "&:nth-of-type(3)": {
      borderRight: "1px solid lightgray",
    },
    // '&:nth-of-type(3)': {
    //     borderRight: "1px solid lightgray"
    // },
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "center",
    "&:nth-of-type(1)": {
      textAlign: "left",
    },
    // '&:nth-of-type(3)': {
    //     borderRight: "1px solid lightgray"
    // },
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

function Row({ title, row }: any) {
  //   const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell component="th" scope="row" width="150px">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {title}
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell
          width="130px"
          style={{ borderRight: "1px solid lightgray" }}
        >
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
        <StyledTableCell width="130px">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, width: "auto" }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {/* <TableRow>
                    <StyledTableCell colSpan={1}>Features List / Client</StyledTableCell>
                    <StyledTableCell colSpan={2}>Partner
                    </StyledTableCell>
                    <StyledTableCell colSpan={8}>My Rcloud Team    </StyledTableCell>
                </TableRow> */}
                </TableHead>
                <TableBody>
                  {row?.subTitle?.map((historyRow: any) => (
                    <TableRow key={historyRow}>
                      <StyledTableCell component="th" scope="row" width="140px">
                        {historyRow}
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        width="135px"
                        style={{ borderRight: "1px solid lightgray" }}
                      >
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                      <StyledTableCell width="130px">
                        <Checkbox
                          defaultChecked
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const mainData = [
  {
    title: "Requisition",
    subTitle: [
      "CreateRequisition",
      "Edit Current Requisition",
      "Requisition Prioritization Changes",
    ],
  },
  {
    title: "Candidate",
    subTitle: ["AddCandidate", "ViewCandidate", "EditCandidate"],
  },
];
const data = [
  "Admin",
  "Recruitment Agency",
  "Individual Recruiters",
  "Admin",
  "CSM Head",
  "CSM",
  "Operations",
  "Internal Sourcing Tea",
  "QC",
  "PSM Head",
  "PSM",
];
const useStyles = makeStyles()((theme) => {
  return {
    main: {
      backgroundColor: "#CCCCCC",
    },
    tableTitle: {
      fontSize: "18px",
      fontWeight: "500px",
      textAlign: "center",
      color: theme.palette.bgBlack.main,
    },
  };
});
export default function CollapsibleTable() {
  const { classes } = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          {" "}
          <TableRow>
            <StyledTableCell colSpan={1}>
              Features List / Client
            </StyledTableCell>
            <StyledTableCell
              className={classes.tableTitle}
              colSpan={2}
              style={{ borderRight: "1px solid lightgray" }}
            >
              Partner
            </StyledTableCell>
            <StyledTableCell className={classes.tableTitle} colSpan={8}>
              My Rcloud Team{" "}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            {data?.map((e: any, idx: number) => {
              return (
                <StyledTableCell key={idx}>
                  <Typography
                    mt={1}
                    fontSize="14px"
                    fontWeight={700}
                    textAlign="center"
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    {e}
                  </Typography>
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {mainData.map((row, idx: number) => (
            <Row key={idx} title={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
