import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StandardLayout from "@components/Layout/StandardLayout";
import ButtonContained from "@components/Layout/ButtonContained";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import Assets from "@components/common/image_container";
import { useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => {
  return {
    img: {
      width: "100%",
      height: "100%",
      position: "relative",
      [theme.breakpoints.up("xs")]: {
        width: "60%",
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "40%",
        height: "40%",
      },
      [theme.breakpoints.up("md")]: {
        width: "25%",
        height: "20%",
      },
    },
  };
});

const Verification = () => {
  const theme = useTheme();
  const { classes, cx } = useStyles();
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.bgWhite.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
 
  return (
    <StandardLayout title="Verification process">
      <Box bgcolor={theme.palette.bgWhite.main}>
        <Box textAlign="center">
          <Assets
            className={classes.img}
            src={`/assets/img/verification-process.gif`}
          />
          <Typography
            variant={"h5"}
            fontWeight="bold"
            fontSize={{
              xl: "30px",
              lg: "25px",
              md: "25px",
              sm: "20px",
              xs: "20px",
            }}
          >
            Your profile is under review.
            <br />
            Our team will connect you shortly.
          </Typography>
          <Box display="flex" justifyContent={"center"}>
            <ButtonOutlined
              marginTop="20px"
              borderRadius="24px"
              height={{ lg: "42px", md: "38px", sm: "35px", xs: "35px" }}
              width={{ lg: "486px", md: "300px", sm: "200px", xs: "200px" }}
              text="Go to Home"
              marginRight="10px"
              href={"https://www.myrcloud.com/"}
            />
            <ButtonContained
              marginBottom="20px"
              marginTop="20px"
              borderRadius="24px"
              height={{ lg: "42px", md: "38px", sm: "35px", xs: "35px" }}
              width={{ lg: "486px", md: "300px", sm: "200px", xs: "200px" }}
              text="Contact Us"
              href={"https://www.myrcloud.com/contact-us.php"}
            />
          </Box>
        </Box>
      </Box>
    </StandardLayout>
  );
};

export default Verification;
