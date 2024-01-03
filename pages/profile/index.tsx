import React from "react";
import { Box, Grid } from "@mui/material";
import AboutPartnerForm from "@components/auth/aboutPartnerForm";
import StandardLayout from "@components/Layout/StandardLayout";
import { useTheme } from "@mui/material";
import CreatePartnerSwiper from '@components/profile/createPartnerSwiper';

const Index = () => {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#CCCCC";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const theme = useTheme();
  return (
    <StandardLayout title="About Partner" position="fixed" hasBottomBorder>
      <Box>
        <Grid container position="relative">
          <CreatePartnerSwiper
            title="Get Started, It’s Easy"
            subTitle="Please describe your recruiting experience."
            description="Our team will approach you based on the information you share with us."
            image="/assets/img/Group.png"
            initialSlide={0}
          />
          <Grid
            item
            lg={7}
            md={6}
            xs={12}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            bgcolor={(theme) => theme.palette.bgWhite.main}
            position='absolute'
            right={0}
          >
            <AboutPartnerForm />
          </Grid>
        </Grid>
      </Box>
    </StandardLayout>
  );
};

export default Index;
