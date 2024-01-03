import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Assets from "@components/common/image_container";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";

const useStyles = makeStyles()((theme) => {
  return {
    icon: {
      marginRight: "6px",
      color: theme.palette.bgGray.main,
      height: "35px",
    },
    icon2: {
      marginRight: "6px",
      color: theme.palette.bgGray.main,
      height: "33px",
    },
    instruction: {
      color: theme.palette.bgGray.main,
    },
    font16: {
      fontSize: "16px",
    },
    font15: {
      fontSize: "15px",
    },
    font6: {
      fontSize: "6px",
      margin: "0px 7px",
    },
    seQus: {
      background: theme.palette.bgLightBlue.main,
      margin: "10px 0px",
      padding: "7px",
      fontSize: "15px",
      fontWeight: "bold",
    },
    item: {
      height: "67px",
      boxShadow: "none",
      borderRadius: "5px",
    },
    techSkill: {
      padding: "4px 14px ",
      border: `1px solid ${theme.palette.bgBlue.main}`,
      color: theme.palette.bgBlue.main,
      borderRadius: "50px",
      marginRight: "10px",
      marginTop: "15px",
    },
    cusDraBox: {
      padding: "10px 12px",
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      borderRadius: "25px",
      marginRight: "20px",
      marginTop: "15px",
    },
  };
});

const Instruction = [
  {
    icon: <IconWrapper fontSize="small" icon="business-operations" />,
    title: "Work From",
    desc: "Home",
  },
  {
    icon: <IconWrapper fontSize="small" icon="tasklist" />,
    title: "Language preference",
    desc: "English, Hindi",
  },
  {
    icon: <IconWrapper fontSize="small" icon="transaction-history" />,
    title: "Notice period",
    desc: "60 days",
  },
];

const Instruction2 = [
  {
    icon: <IconWrapper fontSize="small" icon="degree" />,
    title: "Mandatory Educational Requirements",
    desc: "Post Graduation",
  },
  {
    icon: <IconWrapper fontSize="small" icon="meeting" />,
    title: "Interview Process",
    desc: "3 Rounds",
  },
];

const Instruction3 = [
  {
    icon: <IconWrapper fontSize="small" icon="star-employee" />,
    title: "Who is an ideal candidate ?",
    desc: "1. Candidate who willing to relocate 2. Atleast he worked in the org for last 3years",
  },
  {
    icon: <IconWrapper fontSize="small" icon="skills" />,
    title: "Mandatory Skills Required",
    desc: "P/L Mgmt, Customer Mgmt, Running large transport operations, cross-functional exposure , Presentation skills, Spreadsheet",
  },
];

const RequisitionQRDrawer = ({ requisition = {} }: any) => {
  const { classes } = useStyles();
  return (
    <Grid container mt={2}>
      <Grid
        item
        md={12}
        lg={12}
        sm={12}
        xs={12}
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Assets src={`/assets/img/myrcloud_logo.png`} height={50} width={120} />
        <Box display={"flex"} flexDirection={"row"} gap={3} p={2}>
          <IconWrapper fontSize="small" icon="e-mail" color="primary" />
          <IconWrapper fontSize="small" icon="whatsapp" color="primary" />
          <IconWrapper fontSize="small" icon="printer" color="primary" />
          <IconWrapper fontSize="small" icon="files" color="primary" />
          <IconWrapper fontSize="small" icon="link" color="primary" />
        </Box>
      </Grid>
      <Grid
        md={12}
        lg={12}
        sm={6}
        xs={6}
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        p={3}
      >
        <Grid item md={6} gap={4} flexDirection={"column"} display={"flex"}>
          <Typography fontSize={"32px"} fontWeight={550}>
            We are Hiring
          </Typography>
          <Box>
            <Typography fontSize={"22px"} fontWeight={600}>
              {requisition?.jobTitle}
            </Typography>
            <Typography
              fontSize={"18px"}
              fontWeight={500}
              color={(theme) => theme.palette.bgGray.main}
            >
              {requisition?.location}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={1}>
            <Typography fontSize={"16px"} fontWeight={500} variant={"caption"}>
              Go to URL:{" "}
            </Typography>
            <Link href="https://bit.ly/3MnIF0W">
              <Typography color="#4E85C5"> https://bit.ly/3MnIF0W</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item md={6} gap={4} display={"flex"} justifyContent={"flex-end"}>
          <Box>
            <Assets
              src="https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png"
              height={145}
              width={145}
              absolutePath={true}
            />
            <Typography fontSize={"10px"} fontWeight={400}>
              Scan the QR Code to apply to this job
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid md={12} lg={12} sm={12} xs={12} p={3}>
        <Grid item display={"flex"} gap={2} flexDirection={"column"}>
          <Typography fontSize={"18px"} fontWeight={550}>
            Comments
          </Typography>
          <Typography fontSize={"14px"} fontWeight={400} variant={"caption"}>
            Validate testing of batteries and record capacity of the batteries
            in sync with barcodes, Battery Charging and discharging, FIFO,
            Battery Management system,
          </Typography>
        </Grid>
      </Grid>
      <Grid md={12} lg={12} sm={12} xs={12}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={1.25}
        >
          <Box padding="0px 24px 0px 24px">
            <Typography variant="h6" fontWeight="bold" margin="0px">
              Screening Questions
            </Typography>
            <Box className={classes?.seQus}>
              How would you describe your management style?
            </Box>
            <Box className={classes?.seQus}>Are you willing to relocate?</Box>
            <Box className={classes?.seQus}>
              Why are you leaving your current job?
            </Box>
            <Box className={classes?.seQus}>What are your key strengths?</Box>
          </Box>{" "}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={1.25}
        >
          <Box padding="0px 24px 0px 24px">
            <Typography variant="h6" mt={"20px"} mb={"20px"} fontWeight="bold">
              Instruction Input Matrix
            </Typography>
          </Box>{" "}
          <Box
            padding="10px 24px 10px 24px"
            display="flex"
            justifyContent="space-between"
          >
            {Instruction?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
          <Box
            padding="10px 24px 10px 24px"
            display="flex"
            justifyContent="space-between"
          >
            {Instruction2?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
          <Box
            padding="10px 24px 10px 24px"
            display="flex"
            justifyContent="space-between"
          >
            {Instruction3?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RequisitionQRDrawer;
