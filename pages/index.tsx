import type { NextPage } from "next";
import "../next-i18next.config";
import LoginLayout from "@components/Layout/LoginLayout";
import { Box, Typography } from "@mui/material";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Home: NextPage = () => {
  return (
    <LoginLayout>
      <Box
        sx={{
          backgroundImage: `url(${publicRuntimeConfig.basePath}/assets/img/landing_bg.png)`,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box ml={20} maxWidth={500}>
          <Typography variant="h2" color="white" gutterBottom>
            Reimagine Recruitment with MyRCloud
          </Typography>
          <Typography variant="h6" color="white">
            Where Human Expertise Meets AI
          </Typography>
        </Box>
      </Box>
    </LoginLayout>
  );
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     // redirect: {
//     //   destination: "/login",
//     //   permanent: false,
//     // },
//   };
// };
export default Home;
