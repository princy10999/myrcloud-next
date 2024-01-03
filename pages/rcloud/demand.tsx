import { Box, Divider, Grid, Typography, Stack, useTheme } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      width: "auto",
      height: "438px",
      borderRadius: 5,
      padding: 15,
    },
    fixBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      padding: 10,
      marginBottom: 15,
      "&:active": {
        backgroundColor: "#F8FCFA",
        border: "1px solid #5EC394",
      },
    },
    autoBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      padding: 10,
      marginBottom: 15,
    },
  };
});

const Demand = () => {
  const { classes } = useStyles();
  const theme = useTheme();

  const data1 = [
    { name: "IT", value: 115 },
    { name: "BPO", value: 80 },
    { name: "Industrial & Manufacturing", value: 75 },
    { name: "Retail & Services", value: 50 },
    { name: "Consumer", value: 25 },
  ];

  const data2 = [
    { name: "High", value: 350 },
    { name: "Medium", value: 100 },
    { name: "Low", value: 50 },
  ];

  const COLORS = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.bgGray.main,
  ];

  const BARCOLORS = ["#008CEF", "#00AEEF", "#2F80ED", "#646CE1", "#4E85C5"];

  return (
    <>
      <Typography fontSize={"22px"} fontWeight={600}>
        Demand
      </Typography>
      <Grid container spacing={3} p={"20px 0px"}>
        <Grid item xs={12} md={4} sm={12}>
          <Box className={classes.item}>
            <Box display={"flex"} flexDirection={"row"}>
              <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                Clients
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  200
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Total client
                </Typography>
              </Box>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  50
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  New client
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  175
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Active client
                </Typography>
              </Box>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  25
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Inactive client
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontSize={"16px"} fontWeight={700} mt={1} mb={1}>
                Sector-wise Clients (Top 5)
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                mt={1}
                color={(theme) => theme.palette.primary.main}
              >
                View All
              </Typography>
            </Box>
            <Grid
              item
              sm={12}
              xs={12}
              md={12}
              p={1}
              fontSize={12}
              fontWeight={400}
            >
              <BarChart
                height={180}
                width={300}
                data={data1}
                layout="vertical"
                barCategoryGap={"5%"}
              >
                <Bar dataKey={"value"} fill="primary" barSize={20}>
                  {data1?.length > 0 &&
                    data1?.map((entry, index) => (
                      <>
                        <Cell
                          key={`cell-${index}`}
                          fill={BARCOLORS[index % BARCOLORS.length]}
                        />
                      </>
                    ))}
                </Bar>
                <Tooltip />
                <XAxis type="number" />
                <YAxis
                  yAxisId={0}
                  type="category"
                  dataKey={"name"}
                  reversed={false}
                />
                <CartesianGrid horizontal={false} vertical={false} />
              </BarChart>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Box className={classes.item}>
            <Box display={"flex"} flexDirection={"row"}>
              <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                Positions
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  500
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  No of Positions
                </Typography>
              </Box>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  300
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Open positions
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  25
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  On hold positions
                </Typography>
              </Box>
              <Box className={classes.fixBox}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  75
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Closed positions
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <Typography fontSize={"16px"} fontWeight={700} mt={1}>
                Position priotity wise
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                mt={1}
                color={(theme) => theme.palette.primary.main}
              >
                View All
              </Typography>
            </Box>

            <Box width="auto" p={1} fontSize={12} fontWeight={400}>
              <BarChart
                width={300}
                height={180}
                data={data2}
                layout="vertical"
                barCategoryGap={"5%"}
              >
                <Bar dataKey={"value"} fill="primary" barSize={30}>
                  {data2?.length > 0 &&
                    data2?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Bar>
                <Tooltip />
                <XAxis type="number" />
                <YAxis
                  yAxisId={0}
                  type="category"
                  dataKey={"name"}
                  reversed={false}
                />
                <CartesianGrid horizontal={false} vertical={false} />
              </BarChart>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={3}
          >
            <Box
              bgcolor={(theme) => theme.palette.bgWhite.main}
              p={2}
              borderRadius={2}
            >
              <Box display={"flex"} flexDirection={"row"}>
                <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                  Requisitions Summary
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                <Box className={classes.fixBox}>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    500
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    Need coverage
                  </Typography>
                </Box>
                <Box className={classes.fixBox}>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    100
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    In Progress(CSM Bucket)
                  </Typography>
                </Box>
                <Box className={classes.fixBox}>
                  <Typography fontSize={"14px"} fontWeight={700}>
                    50
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
            <Box
              bgcolor={(theme) => theme.palette.bgWhite.main}
              p={2}
              borderRadius={2}
            >
              <Box display={"flex"} flexDirection={"row"}>
                <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                  Requisition Ageing
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box
                  sx={{
                    bgcolor: "#EAF4FE",
                    border: "1px solid #DDDDDD",
                    borderTopLeftRadius: 9,
                    borderBottomLeftRadius: 9,
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: 2,
                    gap: "5px",
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
                <Box
                  sx={{
                    bgcolor: "#FFF5E5",
                    border: "1px solid #DDDDDD",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: 2,
                    gap: "5px",
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
                <Box
                  sx={{
                    bgcolor: "#FFEED5",
                    border: "1px solid #DDDDDD",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: 2,
                    gap: "5px",
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

                <Box
                  sx={{
                    bgcolor: "#FDE8EB",
                    border: "1px solid #DDDDDD",
                    borderTopRightRadius: 9,
                    borderBottomRightRadius: 9,
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: 2,
                    gap: "5px",
                  }}
                >
                  <Typography fontSize={"14px"} fontWeight={700}>
                    10
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={500}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    {"<"} 50 days
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor={(theme) => theme.palette.bgWhite.main}
              p={2}
              borderRadius={2}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignContent={"center"}
              >
                <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                  Requisitions with interviews scheduled
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Typography fontSize={"14px"} fontWeight={700}>
                  300
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={500}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Requisitions
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Demand;
