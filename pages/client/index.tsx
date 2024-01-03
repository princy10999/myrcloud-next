import React from 'react';
import StandardLayout from "@components/Layout/StandardLayout";
import Typography from '@mui/material/Typography';
import { Grid, Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import BoxWithNumberAndText from '@components/common/boxWithNumberAndText';
import ClientHeader from '@components/dashborad-header/client-header';
import PaperContainer from '@components/common/paperContainer';

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      width: "auto",
      height: "300px",
      borderRadius: 5,
      padding: 15,
    },
    ageBox: {
      border: "1px solid #DDDDDD",
      borderTopLeftRadius: 9,
      borderBottomLeftRadius: 9,
      width: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      padding: 2,
      gap: "5px",
    },
    fixBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "400px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      padding: 10,
      marginBottom: 10,
      "&:active": {
        backgroundColor: "#F8FCFA",
        border: "1px solid #5EC394",
      },
    },
    ageingBox: {
      width: "200px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      border: "1px solid #DDDDDD",
    },
  };
});

export default function ClientDashboard() {
  const { classes } = useStyles();
  const healthCheckParams = [
    {
      number: "200",
      description: "Total Requisitions Raised",
      caption: "",
    },
    {
      number: "180",
      description: "Open Requisitions",
      caption: "",
    },
    {
      number: "10",
      description: "Closed Requisitions",
      caption: "",
    },
    {
      number: "4",
      description: "On Hold Requisitions",
      caption: "",
    },
    {
      number: "86%",
      description: "Joining Ratio",
      caption: "",
    },
    {
      number: "53",
      description: "Requisitions with Scheduled Interviews",
      caption: "",
    },
  ];
  const list = [
    {
      number: "36.12",
      description: "Avg Time to Offer(Days)",
      caption: "",
    },
    {
      number: "42.12",
      description: "Avg Time to Hire(Days)",
      caption: "",
    },
  ];


  return (
    <>
      <StandardLayout title="Client Dashboard" menuCode="client">
        <Box p={4}>
          <ClientHeader />
          <Grid container md={12} sm={12} xs={12} display="flex" flexWrap={"wrap"}
            spacing={2} mt={1} >
            {healthCheckParams.map((item, idx) => {
              return (
                <Grid key={idx} item xs>
                  <BoxWithNumberAndText
                    numberText={item.number}
                    secondaryText={item.description}
                    caption={item.caption}
                    trend={{
                      trendValue: "0.5%",
                      compareText: "Last month",
                    }}
                    minHeight={150} />

                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={3} pt={"30px"}>
            <Grid item xs={12} md={4} sm={12}>
              <Box className={classes.item}>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                    Candidate Journey
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <Box bgcolor={(theme) => theme.palette.bgWhite.main} minHeight="150px" p={2} borderRadius={2}>
                <Box display={"flex"} flexDirection={"row"}    >
                  <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                    Requisition Ageing
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box className={classes.ageingBox}
                    sx={{
                      bgcolor: '#EAF4FE',
                      borderTopLeftRadius: 9,
                      borderBottomLeftRadius: 9,
                      padding: 2
                    }}
                  >
                    <Typography fontSize={"14px"} fontWeight={700}>
                      300
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={500}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      1-7 Days
                    </Typography>
                  </Box>
                  <Box className={classes.ageingBox}
                    sx={{
                      bgcolor: "#FFF5E5",
                      padding: 2,
                    }}
                  >
                    <Typography fontSize={"14px"} fontWeight={700}>
                      150
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={500}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      8-15 Days
                    </Typography>
                  </Box>
                  <Box className={classes.ageingBox}
                    sx={{
                      bgcolor: "#FFEED5",
                      padding: 2,
                    }}
                  >
                    <Typography fontSize={"14px"} fontWeight={700}>
                      50
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={500}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      16-30 Days
                    </Typography>
                  </Box>
                  <Box className={classes.ageingBox}
                    sx={{
                      bgcolor: '#FDE8EB',
                      borderTopRightRadius: 9,
                      borderBottomRightRadius: 9,
                      padding: 2,
                    }}
                  >
                    <Typography fontSize={"14px"} fontWeight={700}>
                      22
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={500}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      {">"} 30 days
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box bgcolor={(theme) => theme.palette.bgWhite.main} minHeight="150px" p={2} borderRadius={2} mt={"24px"}>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography fontSize={"16px"} fontWeight={700} mb={2}>
                    Requisitions Summary
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} gap={"28px"}>
                  <Box className={classes.fixBox}>
                    <Box>
                      <Typography fontSize={"14px"} fontWeight={700}>
                        500
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={500}
                        color={(theme) => theme.palette.bgGray.main}
                      >
                        Open
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.fixBox}>
                    <Box>
                      <Typography fontSize={"14px"} fontWeight={700}>
                        100
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={500}
                        color={(theme) => theme.palette.bgGray.main}
                      >
                        Closed
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.fixBox}>
                    <Box>
                      <Typography fontSize={"14px"} fontWeight={700}>
                        50
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={500}
                        color={(theme) => theme.palette.bgGray.main}
                      >
                        Archived
                      </Typography>
                    </Box>
                  </Box>
                </Box>

              </Box>
              <Box bgcolor={(theme) => theme.palette.bgWhite.main} minHeight="150px" p={2} borderRadius={2} mt={"24px"}>
                <Box >
                  <Typography fontSize={"16px"} fontWeight={700} mb={2}>
                    Offers Dropped
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={700} mb={2} color="red">
                    0.5% vs Last month
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} gap={"28px"}>

                </Box>

              </Box>
            </Grid>

            <Grid container xs={12} md={4} sm={12} mt={1} pl={2} display="flex"  spacing={2}>
              {list.map((item, idx) => {
              return (
                <Grid key={idx} item xs>
                  <BoxWithNumberAndText
                    numberText={item.number}
                    secondaryText={item.description}
                    caption={item.caption}
                    trend={{
                      trendValue: "0.5%",
                      compareText: "Last month",
                    }}
                    minHeight={150} />

                </Grid>
              );
            })} 
            </Grid>

          </Grid>
        </Box>


      </StandardLayout>
    </>
  )
}

