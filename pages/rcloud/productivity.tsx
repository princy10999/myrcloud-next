import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      width: "auto",
      height: "160px",
      borderRadius: 5,
      padding: 20,
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
export default function Productivity  () {
  const { classes } = useStyles();

  return (
    <>
      <Typography fontSize={"22px"} fontWeight={600}>
      Productivity
      </Typography>
      <Grid container spacing={3} p={"20px 0px"}>
        <Grid item xs={12} md={6} sm={12}>
          <Box className={classes.item}>
            <Box display={"flex"} flexDirection={"row"} flexWrap="wrap">
              <Typography fontSize={"16px"} fontWeight={700} mb={1}>
              Requisitions Movement
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} gap={"28px"}>
              <Box className={classes.fixBox}>
                <Box>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    20
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    Need coverage
                  </Typography>
                </Box>        
              </Box>
              <Box className={classes.fixBox}>
                <Box>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    10
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                   In Progress(CSM Bucket)
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.fixBox}>
                <Box>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    10
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    Candidates identified
                  </Typography>
                </Box>         
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <Box className={classes.item}>
            <Box mb={2}>
              <Typography fontSize={"16px"} fontWeight={700} mt={1} mb={1}>
              CSM and Priority-wise percentage 
              </Typography>
              <Typography mb={1}
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                  Total 15 CSM 
                  </Typography>
              <Typography width={"72px"}
                fontSize={"16px"}
                fontWeight={700}
                mt={1}
                color={(theme) => theme.palette.primary.main}
              >
                View All
              </Typography>

            </Box>
          </Box>
        </Grid>

      </Grid>


    </>
  );
};


