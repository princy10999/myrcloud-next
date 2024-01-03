import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";
import PaperContainer from "@components/common/paperContainer";
import { HealthCheckBoxes } from "@pages/partner";

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      width: "auto",
      height: "auto",
      borderRadius: 5,
      padding: "16px",
    },
    fixBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "400px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      padding: 10,
      marginBottom: 20,
      "&:active": {
        backgroundColor: "#F8FCFA",
        border: "1px solid #5EC394",
      },
    },
    trendUp: {
      background: "#ECF8F3",
      borderRadius: 5,
      alignItems: "center",
      display: "flex",
      padding: 10,
      color: "#5EC394",
      gap: 5,
    },
    trendDown: {
      background: "#FDE8EB",
      borderRadius: 5,
      alignItems: "center",
      display: "flex",
      padding: 10,
      color: "#EF627A",
      gap: 5,
    },
  };
});

export default function BusinessHealth () {
  const { classes } = useStyles();
  const healthCheckValues = [
    {
      value: "50%",
      label: "Joined Ratio",
      trendValue: "+5%",
      isUp: true,
    },
    {
      value: "90%",
      label: "Rejection ratio",
      trendValue: "-5%",
      isUp: false,
    },
    {
      value: "28 days",
      label: "Time to hire",
      trendValue: "+5%",
      isUp: true,
    },
    {
      value: "125",
      label: "No. of joinings per month",
      trendValue: "-5%",
      isUp: false,
    },
    {
      value: "100",
      label: "No of offers",
      trendValue: "+5%",
      isUp: true,
    },
    {
      value: "50%",
      label: "Fill up ratio",
      trendValue: "-5%",
      isUp: false,
    },
  ];
  return (
    <>
      <Typography fontSize={"22px"} fontWeight={600}>
        Business Health
      </Typography>
      <Grid container spacing={3} p={"20px 0px"}>
        <Grid item xs={12} md={8} sm={12}>
          <PaperContainer>
            <Typography fontWeight={"bold"}>Health Check</Typography>
            <Grid container mt={0.5} spacing={2}>
              {healthCheckValues.map((item: any, idx: number) => (
                <Grid key={idx} item md={4} xs={12}>
                  <HealthCheckBoxes {...item} />
                </Grid>
              ))}
            </Grid>
          </PaperContainer>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Box className={classes.item}>
            <Box display={"flex"} justifyContent={"space-between"} flexWrap="wrap" mb={2}>
              <Typography fontSize={"16px"} fontWeight={700} mt={1}>
                Revenue
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                mt={1}
                color={(theme) => theme.palette.primary.main}
              >
                View CSM-wise Revenue
              </Typography>
            </Box>
            <Box display={"flex"} gap={"15px"} >
              <Grid md={6} xs={12} sm={12}>
                <Box padding={"15px"} mb={"8px"} gap={'5px'} borderRadius={"10px"} bgcolor={(theme) => theme.palette.bgLightGreen.main} color={(theme) => theme.palette.bgWhite.main}>
                <IconWrapper fontSize="large" icon="compensation"/>
                  <Box display={"flex"} alignItems="flex-end">
                    <Typography fontSize={32} fontWeight={700} >30</Typography>
                    <Typography fontSize={20} fontWeight={500} >Lacs</Typography>
                  </Box>
                  <Typography fontSize={12} fontWeight={500} color={(theme) => theme.palette.bgWhite.main}>Total Revenue</Typography>
                </Box>
              </Grid>
              <Grid md={8} xs={12} sm={12}>
                <Box display={"flex"} flexDirection={{ lg:'row', md:'column', sm:'row', xs:'row' }} mb={2} padding={"12px"} borderRadius="10px" bgcolor={(theme) => theme.palette.bgLightGray.main} alignItems="center" justifyContent={"space-between"}>
                  <Typography fontSize={18} fontWeight={700} color={(theme) => theme.palette.bgBlack.main}>52K</Typography>
                  <Typography fontSize={12} fontWeight={500} color={(theme) => theme.palette.bgGray.main}>Avg revenue per hire</Typography>
                  <Box mt={1} color={(theme) => theme.palette.bgGray.main}><IconWrapper fontSize="small" icon="users"/></Box>
                </Box>
                <Box display={"flex"} flexDirection={{ lg:'row', md:'column', sm:'row', xs:'row' }} padding={"12px"} borderRadius="10px" bgcolor={(theme) => theme.palette.bgLightGray.main} alignItems="center" justifyContent={"space-between"}>
                  <Typography fontSize={18} fontWeight={700} color={(theme) => theme.palette.bgBlack.main}>1.25Lac</Typography>
                  <Typography fontSize={12} fontWeight={500} color={(theme) => theme.palette.bgGray.main}>Partner payout</Typography>
                  <Box mt={1} color={(theme) => theme.palette.bgGray.main}> <IconWrapper fontSize="medium" icon="employee-transfer"/></Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};


