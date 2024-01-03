import React, { useEffect } from "react";
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
import SwitchTitle from "@components/Layout/SwitchTitle";
import { getAllClients } from "@redux/Redux/Actions/ClientCreation";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
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
    backgroundColor: theme.palette.common.white,
    textAlign: "left",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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
      fontSize: "14px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: theme.palette.bgGray.main,
      borderRadius: 10,
      gap: "10px",
    },
  };
});
const list = [
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
  {
    clientDetails: {
      title: "EverSource Capital",
      name: "Client ID - EverSource",
    },
    contactDetails: { name: "Prashant", phoneNo: "8530426629" },
    city: "Mumbai",
    state: "Maharastra",
    country: "India",
    partners: "02",
  },
];

export default function ClientList({ menuCode }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  let [page, setPage] = React.useState(1);
  const [clientListData, setClientListData] = React.useState([]);

  const PER_PAGE = 10;

  const count = Math.ceil(list.length / PER_PAGE);
  const _DATA = usePagination(clientListData || [], PER_PAGE);

  const handleChange = (e: any, p: any) => {
    setPage(p);
    console.log(p)
    _getAllClients({ PageIndex: p, PageSize: PER_PAGE });
  };
  useEffect(() => {
    _getAllClients({ PageIndex: 1, PageSize: PER_PAGE });
  },[]);

  const _getAllClients = async ({ PageIndex, PageSize, SearchText }: any) => {
    const body = SearchText
      ? `?PageIndex=${1}&PageSize=${10}&SearchText=${"tes"}`
      : `?PageIndex=${PageIndex}&PageSize=${PageSize}`;
    const allClients = await dispatch(getAllClients(body));
    setClientListData(allClients.payload.data);
    console.log(allClients.payload.data)
  };
  return (
    <>
      <StandardLayout title="Client List" menuCode={menuCode || "rcloud"}>
        <PaperContainer elevation={0} sx={{ p: 3 }}>
          <BreadCrumbs
            item={[
              // { name: "Client", href: "/app/rcloud/clients" },
              { name: "Client List", href: "/app/rcloud/clients" },
              {
                name: "Create Client",
                href: "/app/rcloud/clients/create-client",
              },
            ]}
          />
        </PaperContainer>
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
                Client List
              </Typography>
            </Box>
            <Box>
              <ButtonText text="Filter" startIcon={<FilterAltOutlinedIcon />} />
              <ButtonText text="Search" startIcon={<SearchIcon />} />
              <ButtonContained
                borderRadius="24px"
                text="Create Client"
                endIcon={<AddIcon />}
                onClick={() => {
                  router.push("/rcloud/clients/create-client");
                }}
              />
            </Box>
          </Stack>
          <Grid spacing={2} gap={2}>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead
                  component={PaperContainer}
                  className={classes?.title}
                >
                  <TableRow>
                    <StyledTableCell>Client Details</StyledTableCell>
                    <StyledTableCell>Contact Details</StyledTableCell>
                    <StyledTableCell>City</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                    <StyledTableCell>Country</StyledTableCell>
                    <StyledTableCell>Partners</StyledTableCell>
                    <StyledTableCell>Position Status</StyledTableCell>
                    {/* <StyledTableCell>Ratings</StyledTableCell> */}
                    <StyledTableCell>{""}</StyledTableCell>
                    <StyledTableCell>{""}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_DATA.currentData().map((item: any, id: any) => {
                    return (
                      <StyledTableRow key={id}>
                        <StyledTableCell component="th" scope="row">
                          <Box display="flex" gap={1} alignItems="center">
                            <Assets src="/icon/person-pic.svg" />
                            <Box>
                              <Typography
                                fontSize={14}
                                fontWeight={700}
                                color={(theme) => theme.palette.bgBlack.main}
                              >
                                {item?.clientName}
                              </Typography>
                              <Typography
                                fontSize={12}
                                fontWeight={400}
                                color={(theme) => theme.palette.bgGray.main}
                              >
                                {"Client Code: " + item?.clientCode}
                              </Typography>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography
                            fontSize={14}
                            fontWeight={700}
                            color={(theme) => theme.palette.bgBlack.main}
                          >
                            {"Prashant"}
                          </Typography>
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            color={(theme) => theme.palette.bgGray.main}
                          >
                            {"8530426629"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            color={(theme) => theme.palette.bgBlack.main}
                          >
                            {item?.address?.city}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            color={(theme) => theme.palette.bgBlack.main}
                          >
                            {item?.address?.state}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            color={(theme) => theme.palette.bgBlack.main}
                          >
                            {item?.address?.country}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            color={(theme) => theme.palette.bgBlack.main}
                          >
                            {item?.summary?.partnerCount}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Typography variant="caption" color="textPrimary">
                            <Stack
                              direction={"row"}
                              alignItems="center"
                              spacing={1}
                            >
                              <Box width={"64px"}>
                                <LinearProgress
                                  variant="determinate"
                                  value={item?.summary?.positionCount >0 ? (item?.summary?.closedPosition/item?.summary?.positionCount)*100 : 0}
                                  sx={{ borderRadius: "50px" }}
                                />
                              </Box>
                              <span>{item?.summary?.closedPosition + "/" + item?.summary?.positionCount}</span>
                            </Stack>
                          </Typography>
                        </StyledTableCell>
                        {/* <StyledTableCell component="th" scope="row">
                          <Box display={"flex"} gap={1}>
                            <Typography
                              fontSize={14}
                              fontWeight={700}
                              color={(theme) => theme.palette.primary.main}
                            >
                              Rating 4.7
                            </Typography>
                            <Rating
                              name="size-small"
                              defaultValue={2}
                              size="small"
                              sx={{ bgcolor: "primary" }}
                            />
                            <Typography
                              fontSize={14}
                              fontWeight={400}
                              color={(theme) => theme.palette.primary.main}
                            >
                              (3587)
                            </Typography>
                          </Box>
                        </StyledTableCell> */}
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
                              onClick={() => {
                                // router.push("/rcloud/clients/edit-client");
                                router.push({
                                  pathname: "/rcloud/clients/edit-client",
                                  query: {
                                    requisitionId: item?.clientId,
                                  },
                                });
                              }}
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
                            <SwitchTitle switchName2="Active" />
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
    </>
  );
}
