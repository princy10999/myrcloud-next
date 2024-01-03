import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    slider: {
      width: "500px",
      height: "430px",
    },
    img1: {
      height: "auto",
      maxHeight: "300px",
      [theme.breakpoints.up("xs")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        height: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "auto",
        maxHeight: "300px",
      },
    },
    img2: {
      height: "auto",
      maxHeight: "300px",
      [theme.breakpoints.up("xs")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("md")]: {
        width: "68%",
        height: "58%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "auto",
        maxHeight: "300px",
      },
    },
    img3: {
      height: "auto",
      maxHeight: "300px",
      [theme.breakpoints.up("xs")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "20%",
        height: "40%",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        height: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "auto",
        maxHeight: "300px",
      },
    },
  };
});

export default function CreatePartnerSwiper(props: any) {
  const { classes, cx } = useStyles();
  return (
    <Grid
      item
      lg={5}
      paddingTop={8}
      md={5}
      xs={8}
      display={{ xs: "none", md: "block" }}
      mt={{ md: 8, lg: 8 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
    >
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Box className="">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={classes?.slider}
            initialSlide={props?.initialSlide || 0}
          >
            <SwiperSlide>
              {" "}
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: "30px", md: "20px", sm: "20px", xs: "25px" }}
              >
                Get Started, It’s Easy
              </Typography>
              <Assets src={`/assets/img/Group.png`} className={classes.img1} />
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: 18, md: 15, sm: 8, xs: 8 }}
              >
                Please describe your recruiting experience.
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                // fontSize={14}
                color={(theme) => theme.palette.bgGray.main}
                fontSize={{ lg: 13, md: 11, sm: 8, xs: 8 }}
              >
                Our team will approach you based on the information you share with
                us.
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: "28px", md: "18px", sm: "20px", xs: "25px" }}
                width={{ lg: "90%" }}
              >
                Your Recruiting journey is about to begin.
              </Typography>
              <Assets
                src={`/assets/img/business-women 2.png`}
                className={classes.img2}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: 17.5, md: 14.5, sm: 8, xs: 8 }}
              >
                Need your business and bank details
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                // fontSize={14}
                color={(theme) => theme.palette.bgGray.main}
                fontSize={{ lg: 13, md: 11, sm: 8, xs: 8 }}
                width={{ md: "90%" }}
                lineHeight={1.2}
              >
                For future transactions, you need to know your business and bank
                information.
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: "30px", md: "20px", sm: "20px", xs: "25px" }}
              >
                Final Step
              </Typography>
              <Assets
                src={`/assets/img/business-women-final.png`}
                className={classes.img3}
              // src={`${props?.image}`}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                fontSize={{ lg: 18, md: 15, sm: 8, xs: 8 }}
              >
                Please describe your recruiting experience.
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                color="#777777"
                fontSize={{ lg: 13, md: 11, sm: 8, xs: 8 }}
              >
                Our team will approach you based on the information you share with
                us.
              </Typography>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>
    </Grid>
  );
}
