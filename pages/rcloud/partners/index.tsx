import StandardLayout from "@components/Layout/StandardLayout";
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonContained from "@components/Layout/ButtonContained";
import PartnerList from "@components/partner-psm-verifies/partner-list";
import FullPageLayout from "@components/Layout/FullPageLayout";
import CustomDrawer from "@components/common/CustomDrawer";

import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import SignUpForm from "@components/auth/signupForm";
import { useRouter } from "next/router";

const PSMVerifies = () => {
  const theme = useTheme();
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [tab, setTab] = React.useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  //   const { classes } = useStyles();

  return (
    <StandardLayout title="Partner List" menuCode="rcloud">
      <FullPageLayout>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tab}>
              <Box display={{ lg: "flex" }} justifyContent={"space-between"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontSize={"22px"} fontWeight={600} mr={3}>
                    Partners List
                  </Typography>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Pending Verification" value="1" />
                    <Tab label="Verified" value="2" />
                    <Tab label="Rejected" value="3" />
                  </TabList>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={3}>
                  <Button
                    size="small"
                    onClick={() => {}}
                    color={"inherit"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      fontSize: "14px",
                    }}
                  >
                    <IconWrapper
                      fontSize="small"
                      icon="filter"
                      color="primary"
                    />
                    Filter
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {}}
                    color={"inherit"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      fontSize: "14px",
                    }}
                  >
                    <IconWrapper
                      fontSize="small"
                      icon="search"
                      color="primary"
                    />
                    Search
                  </Button>
                  <ButtonContained
                    marginBottom="20px"
                    marginTop="20px"
                    fontWeight={300}
                    borderRadius="30px"
                    text="Create Partner"
                    endIcon={
                      <IconWrapper
                        fontSize="small"
                        icon="plus-symbol"
                        // color="primary"
                      />
                    }
                    onClick={() => {
                      setIsDrawerOpen(true);
                    }}
                  />
                </Stack>
              </Box>
              <TabPanel value="1" sx={{ px: 0, py: 0 }}>
                <PartnerList tab={1} status={"pending"} />
              </TabPanel>
              <TabPanel value="2" sx={{ px: 0, py: 0 }}>
                <PartnerList tab={2} status={"approved"} />
              </TabPanel>
              <TabPanel value="3" sx={{ px: 0, py: 0 }}>
                <PartnerList tab={3} status={"rejected"} />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        {isDrawerOpen && (
          <CustomDrawer
            isDrawerOpen={isDrawerOpen}
            handleClose={() => {
              setIsDrawerOpen(false);
            }}
            anchor={"right"}
          >
            <Box sx={{ marginTop: 0 }}>
              <CustomeDrawerHeader
                handleClose={() => setIsDrawerOpen(false)}
                title="Create New Partner"
              />{" "}
              <Box className="signup">
                <SignUpForm
                  createByPsm
                  onClose={() => {
                    setIsDrawerOpen(false);
                    router.reload();
                  }}
                />
              </Box>
            </Box>
          </CustomDrawer>
        )}
      </FullPageLayout>
    </StandardLayout>
  );
};

export default PSMVerifies;
