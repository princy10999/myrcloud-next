import React from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Divider,
  Rating,
  useTheme,
  Paper,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import StandardLayout from "@components/Layout/StandardLayout";
import PartnerHeader from "@components/dashborad-header/partner-header";
import PieChartComponent from "@components/common/PieChartCommon";
import { IconWrapper } from "@components/common/customSvgIcon";
import FullPageLayout from "@components/Layout/FullPageLayout";
import PaperContainer from "@components/common/paperContainer";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomTooltip from "@components/common/customTooltip";
import Link from "next/link";
import { useAppSelector } from "@redux/Redux/app/hooks";
import PartnerProfilePic from "@components/partner/partnerProfilePic";
import { getPartnerDetails } from "@redux/Redux/Actions/Partners";
import { useDispatch } from "react-redux";

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      backgroundColor: "#FFF",
      borderRadius: 5,
      padding: 5,
    },
    talent_logo: {
      marginTop: 5,
      marginBottom: 5,
    },
    fixBox: {
      border: "1px solid #DDDDDD",
      borderRadius: 5,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      padding: 10,
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
    status: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexWrap: "wrap",
      height: "36px",
      margin: "2px auto",
    },
  };
});

const candidateRequisiton = [
  {
    id: 1,
    content: "Sourcing",
    value: 3000,
    color: "black",
    bgColor: "#EF627A",
    percentage: "100%",
  },
  {
    id: 2,
    content: "Screening",
    value: 1500,
    color: "white",
    bgColor: "#444444",
    percentage: "95%",
  },
  {
    id: 3,
    content: "CV Submitted",
    value: 1000,
    color: "black",
    bgColor: "#FFBE5E",
    percentage: "89%",
    margin: "0px 60px 0px 60px",
  },
  {
    id: 4,
    content: "Interview Pending",
    value: 100,
    color: "black",
    bgColor: "#B6B6B6",
    percentage: "82%",
  },
  {
    id: 5,
    content: "Round 1",
    value: 500,
    color: "black",
    bgColor: "#4E85C5",
    percentage: "75%",
  },
  {
    id: 6,
    content: "Round 2",
    value: 400,
    color: "black",
    bgColor: "#00AEEF",
    percentage: "68%",
  },
  {
    id: 7,
    content: "Round 3",
    value: 300,
    color: "black",
    bgColor: "#2F80ED",
    percentage: "62%",
  },
  {
    id: 8,
    content: "HR Round",
    value: 200,
    color: "black",
    bgColor: "#008CEF",
    percentage: "56%",
  },
  {
    id: 9,
    content: "Offered",
    value: 100,
    color: "black",
    bgColor: "#5EC394",
    percentage: "51%",
  },
  {
    id: 10,
    content: "Offer Accepted",
    value: 90,
    color: "black",
    bgColor: "#3FBC82",
    percentage: "45%",
  },
  {
    id: 11,
    content: "Joined",
    value: 75,
    color: "black",
    bgColor: "#1BA39C",
    percentage: "41%",
  },
];
const RADIAN = Math.PI / 180;

const data = [
  { name: "Open", value: 400 },
  { name: "On Hold", value: 300 },
  { name: "Draft", value: 300 },
  { name: "Closed", value: 200 },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      //textAnchor={x > cx ? "start" : "end"}
      textAnchor={"middle"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={"bold"}
    >
      {`${(percent * 100).toFixed(0)}`}
    </text>
  );
};
const COLORS1 = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PartnerDashboard() {
  const { classes } = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [rating, setRating] = React.useState<number | null>(2);

  const data1 = [
    { name: "IT", value: 115 },
    { name: "BPO", value: 80 },
    { name: "Industrial & Manufacturing", value: 75 },
    { name: "Retail & Services", value: 50 },
    { name: "Consumer", value: 25 },
  ];
  const data2 = [
    { name: "IT", value: 115 },
    { name: "BPO", value: 80 },
    { name: "Industrial & Manufacturing", value: 75 },
    { name: "Retail & Services", value: 50 },
    { name: "Consumer", value: 25 },
  ];

  const BARCOLORS = [
    theme.palette.primary.main,
    theme.palette.bgBlue.main,
    theme.palette.bgPurple.main,
    theme.palette.error.main,
  ];
  const partnerDetails: any = useAppSelector(
    (state: any) => state?.partner?.isGetPartnerDetail?.partnerDetails
  );
  const _getPartnerDetails = React.useCallback(async () => {
    await dispatch(getPartnerDetails());
  }, []);
  React.useEffect(() => {
    _getPartnerDetails();
  }, []);
  return (
    <StandardLayout title="Partner Dashboard" menuCode="partner">
      <FullPageLayout>
        <Box my={2}>
          <PartnerHeader />
          <PartnerBody
            partnerDetails={partnerDetails}
            getPartnerDetails={_getPartnerDetails}
          />
        </Box>
      </FullPageLayout>
    </StandardLayout>
  );
}

const PartnerBody = ({ partnerDetails = {}, getPartnerDetails }: any) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const healthCheckValues = [
    {
      value: "90%",
      label: "Quality CV Approval",
      trendValue: "-5%",
      isUp: false,
    },
    {
      value: "230",
      label: "CVs Submitted across Requisitions",
      trendValue: "-5%",
      isUp: false,
    },

    {
      value: "10",
      label: "No. of Requisitions Worked on",
      trendValue: "+5%",
      isUp: true,
    },
    {
      value: "2 days",
      label: "Average time of sourcing",
      trendValue: "-5%",
      isUp: false,
    },
  ];
  const ClosureRevenueEarned = {
    value: "2 Lacs",
    label: "Closures + Revenue Earned",
    trendValue: "-5%",
    isUp: false,
  };
  const QCRejectionReasons = [
    {
      value: "80%",
      label: "High Salary Expectation",
    },
    {
      value: "60%",
      label: "Incomplete Profile",
    },
    {
      value: "40%",
      label: "Technical knowledge",
    },
    {
      value: "20%",
      label: "Relocation Issues",
    },
    {
      value: "10%",
      label: "Not Relevant Experience",
    },
  ];
  const BARCOLORS = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.bgBlue.main,
    theme.palette.bgLightBlue2.main,
  ];
  const [rating, setRating] = React.useState<number | null>(2);
  return (
    <Grid container spacing={2.5} mt={0} alignItems={"flex-start"}>
      <Grid item container lg={3} md={3} xs={12} spacing={2}>
        <Grid item xs={12}>
          <PaperContainer sx={{ height: "416px" }}>
            <Stack spacing={1} position="relative">
              {partnerDetails ? (
                <>
                  <Box mx={"auto"}>
                    <PartnerProfilePic
                      partnerLogo={partnerDetails?.partnerLogo}
                      partnerName={partnerDetails?.partnerName}
                      width={90}
                      height={90}
                      hideUploadText
                      onSuccess={getPartnerDetails}
                    />
                  </Box>
                  <Box
                    style={{ marginTop: "-12px", zIndex: 1 }}
                    textAlign="center"
                  >
                    <CustomTooltip title={"Your profile is 76% complete."}>
                      <Chip label="76%" size="small" color="primary" />
                    </CustomTooltip>
                  </Box>
                  <Box position={"absolute"} right={0}>
                    <Link href={"/profile"}>
                      <CustomTooltip title={"edit profile"}>
                        <IconButton
                          sx={{
                            border: (theme) =>
                              `1px solid ${theme.palette.divider} `,
                          }}
                        >
                          <IconWrapper
                            color="action"
                            style={{ fontSize: "0.6em" }}
                            icon="edit"
                          />
                        </IconButton>
                      </CustomTooltip>
                    </Link>
                  </Box>

                  <Typography
                    fontWeight={"bold"}
                    alignSelf={"center"}
                    display="flex"
                  >
                    {partnerDetails?.partnerName}{" "}
                    <VerifiedIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        color: (theme) => theme.palette.info.main,
                      }}
                    />
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign={"center"}
                  >
                    <Typography
                      variant="inherit"
                      fontWeight={"bold"}
                      component="span"
                    >
                      Partner ID
                    </Typography>{" "}
                    - {partnerDetails?.partnerCode}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    alignSelf={"center"}
                  >
                    <Rating
                      value={rating}
                      onChange={(event, value) => {
                        setRating(value);
                      }}
                      precision={0.5}
                      color={"#ff6d75"}
                      readOnly
                    />
                  </Stack>

                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    fontWeight={"bold"}
                    alignSelf="center"
                  >
                    {(partnerDetails?.industryPreference || [])
                      .map((t: any) => t.value)
                      .join(" | ")}
                  </Typography>
                  <Box>
                    <Divider flexItem sx={{ my: 3 }} />
                  </Box>
                </>
              ) : null}

              <Typography
                variant="body2"
                color="textSecondary"
                textAlign={"center"}
              >
                PSM Name{" : "}
                <Typography
                  variant="inherit"
                  fontWeight={"bold"}
                  component="span"
                >
                  Prateek
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign={"center"}
              >
                Email{" : "}
                <Typography
                  variant="inherit"
                  fontWeight={"bold"}
                  component="span"
                >
                  Prateek@myrcloud.com
                </Typography>
              </Typography>
            </Stack>
          </PaperContainer>
        </Grid>
        <Grid item xs={12}>
          <PaperContainer sx={{ height: "350px" }}>
            <Typography fontWeight={"bold"}>
              Accepted Requisitions status
            </Typography>
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              mt={2}
            >
              <PieChartComponent
                data={data}
                renderCustomizedLabel={renderCustomizedLabel}
                COLORS={COLORS1}
                width={210}
                height={260}
                cy={110}
                cx={105}
                outerRadius={85}
                innerRadius={56}
              />
            </Box>
          </PaperContainer>
        </Grid>
      </Grid>
      <Grid item container lg={9} md={9} xs={12} spacing={2}>
        <Grid item xs={12}>
          <PaperContainer>
            <Typography fontWeight={"bold"}>Health Check</Typography>
            <Grid container mt={0.5} spacing={2}>
              <Grid item container md={8} xs={12} spacing={2}>
                {healthCheckValues.map((item: any, idx: number) => (
                  <Grid key={idx} item md={6} xs={12}>
                    <HealthCheckBoxes {...item} height="100%" />
                  </Grid>
                ))}
              </Grid>
              <Grid item md={4} xs={12}>
                <HealthCheckBoxes
                  {...ClosureRevenueEarned}
                  height="100%"
                  bgColor
                />
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item container md={6} xs={12} spacing={2}>
            <Grid item xs={12}>
              <PaperContainer>
                <Typography fontWeight={"bold"}>
                  QC Rejection Reasons (Top 5)
                </Typography>
                <Grid container mt={0.5} spacing={2}>
                  {QCRejectionReasons.map((item: any, idx: number) => (
                    <>
                      <Grid item xs={5}>
                        <Typography
                          fontWeight={"bold"}
                          variant="subtitle2"
                          color="textSecondary"
                        >
                          {item.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Box
                          sx={{
                            width: item.value,
                            color: "#fff",
                            bgcolor: BARCOLORS[idx % BARCOLORS.length],
                            height: "24px",
                            minWidth: "4ch",
                            textAlign: "right",
                            px: 1,
                          }}
                        >
                          <Typography
                            fontWeight={"bold"}
                            variant="caption"
                            color="inherit"
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </PaperContainer>
            </Grid>
            <Grid item xs={12}>
              <PaperContainer>
                <Typography fontWeight={"bold"}>
                  Client Rejection Reasons (Top 5)
                </Typography>
                <Grid container mt={0.5} spacing={2}>
                  {QCRejectionReasons.map((item: any, idx: number) => (
                    <>
                      <Grid item xs={5}>
                        <Typography
                          fontWeight={"bold"}
                          variant="subtitle2"
                          color="textSecondary"
                        >
                          {item.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Box
                          sx={{
                            width: item.value,
                            color: "#fff",
                            bgcolor: BARCOLORS[idx % BARCOLORS.length],
                            height: "24px",
                            minWidth: "4ch",
                            textAlign: "right",
                            px: 1,
                          }}
                        >
                          <Typography
                            fontWeight={"bold"}
                            variant="caption"
                            color="inherit"
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </PaperContainer>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <PaperContainer sx={{ height: "100%" }}>
              <Typography fontWeight={"bold"}>
                Candidates in Open Requisitions
              </Typography>
              <Box mt={2}>
                {candidateRequisiton &&
                  candidateRequisiton.map((item: any, id: number) => {
                    return (
                      <Box
                        key={item.id.toString()}
                        className={classes.status}
                        color={"#fff"}
                        width={item?.percentage}
                        bgcolor={item?.bgColor}
                      >
                        <Typography
                          color="inherit"
                          variant="caption"
                          component="span"
                        >
                          {item?.content} {" - "}
                          <Typography
                            color="inherit"
                            variant="inherit"
                            fontWeight={"bold"}
                            component="span"
                          >
                            {item?.value}
                          </Typography>
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            </PaperContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const HealthCheckBoxes = ({
  value = "",
  label = "",
  trendValue = "",
  isUp = true,
  height = "auto",
  bgColor = false,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: height,
        backgroundColor: (theme) =>
          bgColor ? theme.palette.bgLightGreen.main : "",
        color: (theme) => (bgColor ? "#fff" : ""),
      }}
    >
      <Stack>
        <Typography fontWeight={"bold"}>{value}</Typography>
        <Typography
          variant="caption"
          fontWeight={"bold"}
          color={bgColor ? "inherit" : "textSecondary"}
        >
          {label}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          bgcolor: (theme) =>
            isUp
              ? theme.palette.bgTrendGreen.main
              : theme.palette.bgTrendRed.main,
          color: (theme) =>
            isUp ? theme.palette.bgLightGreen.main : theme.palette.error.main,
        }}
        disableElevation
        disableRipple
        startIcon={
          <IconWrapper
            style={{ fontSize: "1em" }}
            icon={isUp ? "up" : "down"}
          />
        }
      >
        {trendValue}
      </Button>
    </Paper>
  );
};

export const getStaticProps = async ({ locale = "en" }) => ({
  props: {
    pageTitle: "Partner Dashboard",
  },
});
