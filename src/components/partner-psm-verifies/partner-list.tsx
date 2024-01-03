import React from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Rating,
  Stack,
  Pagination,
  Switch,
  Button,
} from "@mui/material";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";
import usePagination from "@components/common/pagination";
import { styled } from "@mui/material/styles";
import Router from "next/router";
import { useDispatch } from "react-redux";
import {
  getUnverifiedPartnerListForPSM,
  getPartnerListForPSM,
} from "@redux/Redux/Actions/Partners";
import { PartnerSubscriptionType, RecruiterType } from "@lib/enum";
import CustomTooltip from "@components/common/customTooltip";
import PartnerProfilePic from "@components/partner/partnerProfilePic";
import SwitchTitle from "@components/Layout/SwitchTitle";
const useStyles = makeStyles()((theme) => {
  return {
    talent_logo: {
      marginTop: 5,
      marginBottom: 5,
    },
  };
});

const Item = [
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  {
    partner: { name: "AR consultants", partnerId: "Partner ID - 537456" },
    type: "Agency",
    contact: { name: "Poornima", phoneNo: "8530426629" },
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
];

const PER_PAGE = 5;
const PartnerList = ({ tab, status }: any) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [rating, setRating] = React.useState<number | null>(2);
  const [partnerList, setPartnerList] = React.useState<any>([]);
  const [partnerCount, setPartnerCount] = React.useState<any>(0);
  const [page, setPage] = React.useState<any>(1);
  const handleChange = (e: any, p: any) => {
    setPage(p);
  };

  const _partnerListForPSM = async (page: any) => {
    const fn =
      status == "pending"
        ? getUnverifiedPartnerListForPSM
        : getPartnerListForPSM;
    const _partnerListForPSM = await dispatch(
      fn(
        `?PageIndex=${page}&PageSize=${PER_PAGE}&IsApproved=${
          status == "approved"
        }`
      )
    );
    const _partnerData = _partnerListForPSM?.payload?.data;
    setPartnerList(_partnerData.partners);
    setPartnerCount(_partnerData.partnerCount);
  };

  React.useEffect(() => {
    _partnerListForPSM(page);
  }, [page]);

  const pageCount = Math.ceil(partnerCount / PER_PAGE);
  return (
    <Grid container spacing={2} alignItems="stretch">
      {partnerList.map((item: any, id: any) => {
        return (
          <>
            <Grid item xs={12} md={12} lg={12} sm={12} key={id}>
              <Paper elevation={0} sx={{ p: 1 }}>
                <Grid
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={5}
                  sx={{
                    display: "flex",
                    flexDirection: {
                      lg: "row",
                      md: "column",
                      sm: "column",
                      xs: "column",
                    },
                  }}
                  gap={1}
                >
                  <Grid item md={6} xs={12} lg={3} sm={12} p={1}>
                    <Box display={"flex"} gap={1}>
                      <PartnerProfilePic
                        partnerLogo={item?.partnerLogo}
                        partnerName={item?.partnerName}
                        width={60}
                        height={60}
                        hideUploadText
                      />
                      <Box flexDirection={"column"} display={"flex"}>
                        <Typography fontWeight={700} fontSize={"14px"}>
                          {item?.partnerName}
                        </Typography>
                        <Typography fontWeight={400} fontSize={"12px"}>
                          Partner ID - {item?.partnerCode}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    container
                    item
                    md={12}
                    lg={12}
                    xs={12}
                    sm={12}
                    spacing={{ lg: 2, md: 6, sm: 6, xs: 6 }}
                    p={{ lg: 1, md: 1, sm: 1, xs: 1 }}
                  >
                    <Grid item lg={4} md={3} xs={6} sm={6} display={"flex"}>
                      <Stack direction="row" width={"100%"} spacing={1}>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                          spacing={1}
                        >
                          <Box
                            bgcolor={"#FFBE5E"}
                            fontWeight={400}
                            fontSize={"10px"}
                            textAlign={"center"}
                            borderRadius={5}
                            width={80}
                            p={0.2}
                            textTransform="capitalize"
                          >
                            {
                              PartnerSubscriptionType[
                                item.partnerSubscription || 1
                              ]
                            }{" "}
                            Partner
                          </Box>
                          <Typography
                            display={"flex"}
                            gap={1}
                            fontWeight={400}
                            fontSize={"12px"}
                            color={"#777777"}
                          >
                            <Rating
                              value={rating}
                              onChange={(event, value) => {
                                setRating(value);
                              }}
                              precision={0.5}
                              color={"primary"}
                              size="small"
                            />
                            {`(3587)`}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item lg={2} md={3} xs={6} sm={6}>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        spacing={2}
                      >
                        <Box
                          flexDirection={"column"}
                          display={"flex"}
                          flexWrap="wrap"
                          gap={0.5}
                        >
                          <Typography fontWeight={400} fontSize={"12px"}>
                            Type
                          </Typography>
                          <Typography
                            fontWeight={700}
                            fontSize={"14px"}
                            textTransform="capitalize"
                          >
                            {RecruiterType[item?.partnerType]}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6} sm={6} display={"flex"}>
                      <Stack
                        direction="row"
                        width={"100%"}
                        justifyContent="space-between"
                        spacing={5}
                      >
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                          spacing={1}
                        >
                          <Box
                            flexDirection={"column"}
                            display={"flex"}
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            <Typography fontWeight={400} fontSize={"12px"}>
                              Contact Person
                            </Typography>
                            <Typography fontWeight={700} fontSize={"14px"}>
                              {item?.contactPerson?.name}
                            </Typography>
                            <Typography fontWeight={500} fontSize={"14px"}>
                              <IconWrapper
                                icon="phone"
                                style={{ fontSize: "1rem" }}
                              />{" "}
                              {item?.contactPerson?.mobileNumber}
                            </Typography>
                            <CustomTooltip title={item?.contactPerson?.emailId}>
                              <Typography
                                fontWeight={500}
                                fontSize={"14px"}
                                noWrap
                                maxWidth={180}
                              >
                                <IconWrapper
                                  icon="e-mail"
                                  style={{ fontSize: "1rem" }}
                                />{" "}
                                {item?.contactPerson?.emailId}
                              </Typography>
                            </CustomTooltip>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      xs={6}
                      sm={6}
                      display={"flex"}
                      justifyContent="center"
                    >
                      <Stack
                        direction="column"
                        width={"100%"}
                        display={"flex"}
                        gap={0.5}
                      >
                        <Box display={"flex"} flexDirection={"row"}>
                          <Typography
                            width={"100px"}
                            fontWeight={400}
                            fontSize={"14px"}
                          >
                            City
                          </Typography>
                          <Typography fontWeight={600} fontSize={"12px"}>
                            {item?.address?.city}
                          </Typography>
                        </Box>

                        <Box display={"flex"} flexDirection={"row"}>
                          <Typography
                            fontWeight={400}
                            fontSize={"14px"}
                            width={"100px"}
                          >
                            State
                          </Typography>
                          <Typography fontWeight={600} fontSize={"12px"}>
                            {item?.address?.state}
                          </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"row"}>
                          <Typography
                            fontWeight={400}
                            fontSize={"14px"}
                            width={"100px"}
                          >
                            Country
                          </Typography>
                          <Typography fontWeight={600} fontSize={"12px"}>
                            {item?.address?.country}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    lg={3}
                    sm={12}
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    flexDirection={"row"}
                    alignSelf={"center"}
                    gap={4}
                  >
                    {tab === 2 && (
                      <Button
                        size="small"
                        onClick={() => {
                          Router.push(
                            `/rcloud/partners/profile?id=${item?.partnerId}&isVerify=1`
                          );
                        }}
                        color="primary"
                        sx={{
                          // display: "flex",
                          flexDirection: "column",
                          width: "35%",
                          lineHeight: 1.5,
                          gap: 1,
                          fontSize: "14px",
                        }}
                      >
                        <IconWrapper
                          fontSize="small"
                          icon="edit"
                          color="primary"
                        />
                        View Details
                      </Button>
                    )}

                    {tab === 2 && (
                      <Box display={"flex"} gap={1} alignItems={"center"}>
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
                        <SwitchTitle switchName2="Active" />
                      </Box>
                    )}
                    {(tab === 1 || tab === 3) && (
                      <Button
                        size="small"
                        onClick={() => {
                          Router.push(
                            `/rcloud/partners/profile?id=${item?.partnerId}&isVerify=1`
                          );
                        }}
                        color="primary"
                        sx={{
                          flexDirection: "column",
                          width: "50%",
                          lineHeight: 1.5,
                          gap: 1,
                          fontWeight: 550,
                        }}
                      >
                        <IconWrapper
                          fontSize="small"
                          icon="visibility"
                          color="primary"
                        />
                        View Partner {status == "pending" ? "to verify" : ""}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        );
      })}

      {pageCount > 1 && (
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
            count={pageCount}
            size="small"
            page={page}
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
      )}
    </Grid>
  );
};

export default PartnerList;
