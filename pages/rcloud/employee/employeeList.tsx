import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import PaperContainer from "@components/common/paperContainer";
import {
    Grid,
    Box,
    Stack,
    Typography,
    LinearProgress,
    Rating,
    Switch,
    Pagination,
} from "@mui/material";
import ButtonText from "@components/Layout/ButtonText";
import BreadCrumbs from "@components/Layout/BreadCrumbs";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ButtonContained from "@components/Layout/ButtonContained";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { makeStyles } from "tss-react/mui";
import Avatar from "@mui/material/Avatar";
import { IconWrapper } from "@components/common/customSvgIcon";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import usePagination from "@components/common/pagination";
import FullPageLayout from "@components/Layout/FullPageLayout";
import Assets from "@components/common/image_container";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import SwitchTitle from "@components/Layout/SwitchTitle";

const list = [
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
    {
        employeeDetails: {
            title: "Mayuresh Shinde",
            name: "Emo Code - 1518",
        },
        email: "s.mayuresh@gmail.com",
        dateOfJoining: "07 Jan 2021",
        employeeType: "Full Type",
        role: "Super Admin",
        reportingManager: "Sameera Sait",
    },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.,
        fontSize: 14,
        fontWeight: 700,
        textAlign: "left",
    },
    [`&.${tableCellClasses.root}`]: {
        borderBottom: "none",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.bgGray.main,
        // backgroundColor: theme.palette.common.white,
        textAlign: "left",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 1,
    },
}));

const useStyles = makeStyles()((theme: any) => {
    return {
        box: {
            borderRadius: 10,
            backgroundColor: theme.palette.bgWhite.main,
            height: "50px",
            width: "100%",
            textAlign: "center",
        },
        title: {
            background:"transparent",
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "uppercase",
            color: theme.palette.bgGray.main,
            borderRadius: 10,
            gap: "10px",
        },
        bgWhite:{
            backgroundColor:"white"
        }
    };
});

// const AntSwitch = styled(Switch)(({ theme }) => ({
//     width: 44,
//     height: 24,
//     padding: 0,
//     display: "flex",
//     "&:active": {
//         "& .MuiSwitch-thumb": {
//             width: 20,
//         },
//         "& .MuiSwitch-switchBase.Mui-checked": {
//             transform: "translateX(20px)",
//         },
//     },
//     "& .MuiSwitch-switchBase": {
//         padding: 2,
//         "&.Mui-checked": {
//             transform: "translateX(20px)",
//             color: "#fff",
//             "& + .MuiSwitch-track": {
//                 opacity: 1,
//                 backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1BA39C",
//             },
//         },
//     },
//     "& .MuiSwitch-thumb": {
//         boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
//         width: 20,
//         height: 20,
//         borderRadius: 10,
//         transition: theme.transitions.create(["width"], {
//             duration: 200,
//         }),
//     },
//     "& .MuiSwitch-track": {
//         borderRadius: 44 / 2,
//         opacity: 1,
//         backgroundColor:
//             theme.palette.mode === "dark"
//                 ? "rgba(255,255,255,.35)"
//                 : "rgba(0,0,0,.25)",
//         boxSizing: "border-box",
//     },
// }));
const EmployeeList = () => {
    const { classes } = useStyles();
    let [page, setPage] = React.useState<any>(1);

    const PER_PAGE = 10;

    const count = Math.ceil(list.length / PER_PAGE);
    const _DATA = usePagination(list, PER_PAGE);

    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
    };
    return (
        <StandardLayout
            title="Employee Master"
            menuCode="rcloud"
        >
            <FullPageLayout>
                <Stack
                    direction="row"
                    p={"20px 0px 20px 0px"}
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={"bold"}>
                            Employee List
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems="center">
                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            marginLeft={1}
                            color={(theme) => theme.palette.bgBlack.main}
                        >
                            Active: 194
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontWeight={400}
                            marginLeft={1}
                            color={(theme) => theme.palette.bgBlack.main}
                        >
                            Inactive: 0
                        </Typography>
                        <SearchTextFieldComponents
                        marginLeft={1}
                        placeholder={"Search"}
                      />
                         <Box marginLeft={1}>
                         <Assets src="/icon/refreshIcon.svg" />
                         </Box>
                         <Box marginLeft={1}>
                         <Assets src="/icon/filterIcon2.svg" />
                            </Box> 
                        <ButtonContained
                        marginLeft={1}
                            borderRadius="24px"
                            text="Add Employee"
                            endIcon={<AddIcon />}
                        />
                        <Box
                            marginLeft={1}
                            bgcolor="#1BA39C"
                            color="white"
                            borderRadius={"100%"}
                            height={"35px"}
                            width={"35px"}
                            display={"flex"}
                            justifyContent={"center"}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                            p={1.2}
                        >
                            <IconWrapper fontSize="5px" icon="menu-dots" />
                        </Box>
                    </Box>
                </Stack>
                <Grid spacing={2} gap={2}>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead
                                component={PaperContainer}
                                className={classes?.title}
                            >
                                <TableRow className={classes.bgWhite}>
                                    <StyledTableCell>Employee Details</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Date of Joining</StyledTableCell>
                                    <StyledTableCell>Employee Type</StyledTableCell>
                                    <StyledTableCell>Role</StyledTableCell>
                                    <StyledTableCell>Reporting Manager</StyledTableCell>
                                    <StyledTableCell>{""}</StyledTableCell>
                                    <StyledTableCell>{""}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_DATA.currentData().map((item: any, id: any) => {
                                    return (
                                        <StyledTableRow key={id} >
                                            <StyledTableCell component="th" scope="row" >
                                                <Box display="flex" gap={1} alignItems="center">
                                                    <Assets src="/icon/person-pic.svg" />
                                                    <Box>
                                                        <Typography
                                                            fontSize={14}
                                                            fontWeight={700}
                                                            color={(theme) => theme.palette.bgBlack.main}
                                                        >
                                                            {item?.employeeDetails?.title}
                                                        </Typography>
                                                        <Typography
                                                            fontSize={12}
                                                            fontWeight={400}
                                                            color={(theme) => theme.palette.bgGray.main}
                                                        >
                                                            {item?.employeeDetails?.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography
                                                    fontSize={14}
                                                    fontWeight={400}
                                                    color={(theme) => theme.palette.bgBlack.main}
                                                >
                                                    {item?.email}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography
                                                    fontSize={14}
                                                    fontWeight={400}
                                                    color={(theme) => theme.palette.bgBlack.main}
                                                >
                                                    {item?.dateOfJoining}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography
                                                    fontSize={14}
                                                    fontWeight={400}
                                                    color={(theme) => theme.palette.bgBlack.main}
                                                >
                                                    {item?.employeeType}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography
                                                    fontSize={14}
                                                    fontWeight={400}
                                                    color={(theme) => theme.palette.bgBlack.main}
                                                >
                                                    {item?.role}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography
                                                    fontSize={14}
                                                    fontWeight={400}
                                                    color={(theme) => theme.palette.bgBlack.main}
                                                >
                                                    {item?.reportingManager}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Box
                                                    flexDirection={"column"}
                                                    display={"flex"}
                                                    gap={0.5}
                                                    alignItems={"center"}
                                                >
                                                    <IconWrapper
                                                        icon="edit"
                                                        color={"primary"}
                                                        fontSize={"small"}
                                                    />
                                                    <Typography
                                                        fontWeight={400}
                                                        fontSize={"14px"}
                                                        color={"primary"}
                                                    >
                                                        Edit
                                                    </Typography>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Box display="flex" gap={1} alignItems={"center"}>
                                                    {/* <AntSwitch
                                                        defaultChecked
                                                        inputProps={{ "aria-label": "ant design" }}
                                                    />
                                                    <Typography
                                                        fontSize={14}
                                                        fontWeight={400}
                                                        color={(theme) => theme.palette.bgBlack.main}
                                                    >
                                                        Active
                                                    </Typography> */}
                                                    <SwitchTitle switchName2="Active"/>
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Box
                    mt={2}
                    justifyContent={"center"}
                    display={"flex"}
                    bgcolor={(theme) => theme.palette.bgLightGray.main}
                    width="100%"
                    position="sticky"
                    bottom="0px"
                    p={3}
                >
                    <Pagination
                        count={count}
                        size="small"
                        page={page}
                        // variant="text"
                        // shape="rounded"
                        onChange={handleChange}
                        sx={{
                            "& .MuiPaginationItem-icon": {
                                backgroundColor: "#1BA39C",
                                borderRadius: 5,
                                height: "35px",
                                minWidth: "35px",
                                color: "white",
                                fontSize: "14px",
                            },
                            "& .mui-1ba2zw7-MuiButtonBase-root-MuiPaginationItem-root": {
                                padding: "14px 10px 13px 10px",
                                borderRadius: "50%",
                                height: "20px",
                                minWidth: "10px",
                            },
                            "& .mui-rbegq8-MuiPagination-root .MuiPaginationItem-icon": {
                                fontSize: "54px",
                            },
                        }}
                    />
                </Box>
            </FullPageLayout>
        </StandardLayout>
    )
}

export default EmployeeList