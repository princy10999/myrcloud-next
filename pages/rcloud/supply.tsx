import React from 'react';
import { IconWrapper } from '@components/common/customSvgIcon';
import { Box, Grid, Rating, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import { makeStyles } from "tss-react/mui";
import { HealthCheckBoxes } from '@pages/partner';

const useStyles = makeStyles()((theme) => {
    return {
        item: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "350px",
            borderRadius: 5,
            padding: 15,
        },
        item1: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "430px",
            borderRadius: 5,
            padding: 15,
        },
        item2: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "223px",
            borderRadius: 5,
            padding: 15,
        },
        item3: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "100px",
            borderRadius: 5,
            padding: 15,
        },
        item4: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "545px",
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
            marginBottom: 20,
            "&:active": {
                backgroundColor: "#F8FCFA",
                border: "1px solid #5EC394",
            },
        },
        box: {
            border: "1px solid #DDDDDD",
            borderRadius: 5,
            width: "auto",
            display: "flex",
            justifyContent: 'space-between',
            alignItems: "start",
            padding: 15,
            marginBottom: 15,
            "&:active,&:focus": {
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
        status: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexWrap: "wrap",
            height: "36px",
            margin: "2px auto",
        },
        endBox: {
            backgroundColor: "#FFF",
            width: "auto",
            height: "auto",
            borderRadius: 5,
            padding: 15,
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

const healthCheckValues = [
    {
        value: "50%",
        label: "Qc Approval",
        trendValue: "+5%",
        isUp: true,
    },
    {
        value: "90%",
        label: "Submit to offer ratio",
        trendValue: "-5%",
        isUp: false,
    },
    {
        value: "90%",
        label: "Offer to Joined ratio",
        trendValue: "-5%",
        isUp: false,
    },
];

const submission = [
    {
        value: "2000",
        label: "No of CVs submitted",
        trendValue: "+5%",
        isUp: true,
    },
    {
        value: "100",
        label: "Average no of CVs submitted per day",
        trendValue: "-5%",
        isUp: false,
    },
    {
        value: "1500",
        label: "CV submission by Agency",
        trendValue: "-5%",
        isUp: false,
    },
    {
        value: "500",
        label: "CV Submission by Independent Recruiters",
        trendValue: "+5%",
        isUp: true,
    },
];

export default function Supply() {
    const { classes } = useStyles();
    return (
        <>
            <Typography fontSize={"22px"} fontWeight={600} >
                Supply
            </Typography>
            <Grid container spacing={3} p={"20px 0px"}>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.item} >
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Partner
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
                                    Total Partners
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
                                    New Partners
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
                                    Active Partners
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
                                    Inactive Partners
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                            <Box className={classes.fixBox}>
                                <Typography fontSize={"14px"} fontWeight={700}>
                                    125
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Agency Partners
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
                                    Independent Partners
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.item}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Partner requisitions summary
                            </Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                            <Box className={classes.fixBox}>
                                <Typography fontSize={"14px"} fontWeight={700} mb={2}>
                                    200
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Total requisitions worked
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    by Partners
                                </Typography>
                            </Box>
                            <Box className={classes.fixBox}>
                                <Typography fontSize={"14px"} fontWeight={700} mb={2}>
                                    50
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Requisitions covered by
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    unique Partners
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
                            <Box className={classes.fixBox}>
                                <Typography fontSize={"14px"} fontWeight={700} mb={2}>
                                    125
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Requisitions worked by
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    agency Partners
                                </Typography>
                            </Box>
                            <Box className={classes.fixBox}>
                                <Typography fontSize={"14px"} fontWeight={700} mb={2}>
                                    75
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Requisitions worked by
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    Independent Partners
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.item}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Partner Rating-wise
                            </Typography>
                        </Box>
                        <Grid item xs={8} mt={2} spacing={2}>
                            <Grid display="flex" justifyContent={"space-between"} alignItems="center" mb={3}>
                                <Typography fontSize={"14px"} color="#999999"
                                    fontWeight={700} >
                                    4 to 5
                                </Typography>
                                <Rating />
                                <Typography fontSize={"14px"} color="#444444"
                                    fontWeight={700} >
                                    100
                                </Typography>
                            </Grid>
                            <Grid display="flex" justifyContent={"space-between"} alignItems="center" mb={3}>
                                <Typography fontSize={"14px"} color="#999999"
                                    fontWeight={700} >
                                    3 to 4
                                </Typography>
                                <Rating />
                                <Typography fontSize={"14px"} color="#444444"
                                    fontWeight={700} >
                                    50
                                </Typography>
                            </Grid>
                            <Grid display="flex" justifyContent={"space-between"} alignItems="center" mb={3}>
                                <Typography fontSize={"14px"} color="#999999"
                                    fontWeight={700} >
                                    2 to 3
                                </Typography>
                                <Rating />
                                <Typography fontSize={"14px"} color="#444444"
                                    fontWeight={700} >
                                    20
                                </Typography>
                            </Grid>
                            <Grid display="flex" justifyContent={"space-between"} alignItems="center" mb={3}>
                                <Typography fontSize={"14px"} color="#999999"
                                    fontWeight={700} >
                                    1 to 2
                                </Typography>
                                <Rating />
                                <Typography fontSize={"14px"} color="#444444"
                                    fontWeight={700} >
                                    15
                                </Typography>
                            </Grid>
                            <Grid display="flex" justifyContent={"space-between"} alignItems="center" mb={3}>
                                <Typography fontSize={"14px"} color="#999999"
                                    fontWeight={700} >
                                    0 to 1
                                </Typography>
                                <Rating />
                                <Typography fontSize={"14px"} color="#444444"
                                    fontWeight={700} >
                                    05
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} p={"20px 0px"} >
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.item2}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Partner Category-wise
                            </Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} color={(theme) => theme.palette.bgWhite.main} gap={2}>
                            <Box className={classes.fixBox} bgcolor="#E1D701">
                                <Typography fontSize={"14px"} fontWeight={700}>
                                    200
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                >
                                    Gold
                                </Typography>
                            </Box>
                            <Box className={classes.fixBox} bgcolor="#C0C0C0">
                                <Typography fontSize={"14px"} fontWeight={700}>
                                    50
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                >
                                    Silver
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} color={(theme) => theme.palette.bgWhite.main} gap={2}>
                            <Box className={classes.fixBox} bgcolor="#CD7F32">
                                <Typography fontSize={"14px"} fontWeight={700}>
                                    200
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                >
                                    Bronze
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.item} marginTop={"20px"}>
                        <Typography fontSize={"16px"} fontWeight={700} mb={0.5}> Overview</Typography>
                        <Grid container spacing={2}>
                            {healthCheckValues.map((item: any, idx: number) => (
                                <Grid key={idx} item md={12} xs={12}>
                                    <HealthCheckBoxes {...item} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12} gap={2}>
                    <Box className={classes.item1}>
                        <Typography fontSize={"16px"} fontWeight={700} mb={1}> CV submission  by Partners</Typography>
                        <Grid container spacing={2}>
                            {submission.map((item: any, idx: number) => (
                                <Grid key={idx} item md={12} xs={12}>
                                    <HealthCheckBoxes {...item} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box className={classes.item3} marginTop={"10px"}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                SLA for sourcing - Agency/ IR + Internal Recruitment
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.item4} >
                        <Box display={"flex"} flexDirection={"row"} mb={2}>
                            <Typography fontSize={"16px"} fontWeight={700} >
                                Requisitions stagewise status
                            </Typography>
                        </Box>
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
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3} p={"20px 0px"} >
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.endBox}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Number of partners worked on requisitions
                            </Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box
                                sx={{
                                    bgcolor: '#EAF4FE',
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
                                    0 - 5 Req
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
                                    6 -10 Req
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
                                    11 -15 Req
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: "#FDE8EB",
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
                                    10
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    16 - 25 Req
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: '#DAF1E6',
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
                                    {"<"} 25 {"+"} Req
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.endBox}>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={"16px"} fontWeight={700} mb={1}>
                                Number of partners who have submitted CVs
                            </Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box
                                sx={{
                                    bgcolor: '#EAF4FE',
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
                                    10
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    0 - 5 Cv
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
                                    20
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    6 -10 Cv
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
                                    10
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    11 -15 Cv
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: "#FDE8EB",
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
                                    20
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    16 - 25 Cv
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: '#DAF1E6',
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
                                    5
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    fontWeight={500}
                                    color={(theme) => theme.palette.bgGray.main}
                                >
                                    {"<"} 25 {"+"} Cv
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Box className={classes.endBox}>
                        <Typography fontSize={"16px"} fontWeight={700} >
                            Avg no of partners who are working for 1 Requisition
                        </Typography>
                        <Box mt={2}>
                            <Box className={classes.box} >
                                <Box>
                                    <Typography fontSize={"14px"} fontWeight={700}>
                                        100
                                    </Typography>
                                    <Typography
                                        fontSize={"12px"}
                                        fontWeight={500}
                                        color={(theme) => theme.palette.bgGray.main}
                                    >
                                        Unique partner count
                                    </Typography>
                                </Box>
                                <Box className={classes.trendUp}>
                                    <IconWrapper fontSize="small" icon="up" />
                                    <Typography fontSize={"12px"} fontWeight={400}>
                                        +5%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
