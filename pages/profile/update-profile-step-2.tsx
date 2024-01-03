import React from "react";
import { Box, Grid } from "@mui/material";
import CreatePartnerSwiper from "@components/profile/createPartnerSwiper";
import AboutPartnerForm2 from "@components/auth/aboutPartnerForm2";
import StandardLayout from "@components/Layout/StandardLayout";


export default function Update_profile_step_2() {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#CCCCC";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <StandardLayout title="Compliance Information" position="fixed">
      <Box>
        <Grid container position="relative">
          <CreatePartnerSwiper
            title="Your Recruiting journey is about to begin."
            subTitle="Need your business and bank details"
            description="For future transactions, you need to know your business and bank information."
            image="/assets/img/business-women 2.png"
            initialSlide={1}
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
            <AboutPartnerForm2 />
          </Grid>
        </Grid>
      </Box>
    </StandardLayout>
  );
}
