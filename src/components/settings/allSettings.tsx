import React from "react";
import { Box, Typography } from "@mui/material";
import FullPageTitle from "@components/common/fullPageTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DefiningMaster from "@components/settings/definingMaster";
import ComponentConfiguration from "@components/settings/componentConfiguration";
import PushNotificationTab from "@components/settings/pushNotificationTab";
import Promotion from "@components/settings/promotion";
import GroupTab from "@components/settings/groupTab";
import TabPanel from "@components/common/tabPanelComponent";
import RolePermission from "./rolePermission";

const settingTabs = [
  {
    name: "Defining Masters",
  },
  {
    name: "Component Configuration ",
  },
  {
    name: "Roles and Permissions",
  },
  {
    name: "Group",
  },
  {
    name: "Push Notification",
  },
  {
    name: "Promotion",
  },
];
export default function AllSettings() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <Box my={2}>
        <FullPageTitle title="Settings" />
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="scrollable"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: { bottom: 6 },
          }}
        >
          {settingTabs.map((item: any, idx: number) => {
            return (
              <Tab key={idx} label={item.name} sx={{ textTransform: "none" }} />
            );
          })}
        </Tabs>
        <TabPanel value={value} index={0}>
         <DefiningMaster/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ComponentConfiguration />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RolePermission />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <GroupTab />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <PushNotificationTab />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Promotion />
        </TabPanel>
      </Box>
    </>
  );
}
