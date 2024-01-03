import React from "react";
import { Box, Grid } from "@mui/material";
import CreatePartnerSwiper from "@components/profile/createPartnerSwiper";
import StandardLayout from "@components/Layout/StandardLayout";
import { useTheme } from "@mui/material";
import AboutPartnerDocumentForm from "@components/auth/aboutPartnerDocumentForm";

export default function Upload_document_step_2() {
  const theme = useTheme();
  React.useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.backgroundDefaultColor.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <StandardLayout title="Documents" position="fixed">
      <Box>
        <Grid container position="relative">
          <CreatePartnerSwiper
            title="Final Step"
            subTitle="Please describe your recruiting experience."
            description="Our team will approach you based on the information you share with us."
            image="/assets/img/business-women-final.png"
            initialSlide={2}
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
            position="absolute"
            right={0}
            width="100%"
          >
            <AboutPartnerDocumentForm />
          </Grid>
        </Grid>
      </Box>
    </StandardLayout>
  );
}
