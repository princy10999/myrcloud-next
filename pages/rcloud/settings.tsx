import React from "react";
import PaperContainer from "@components/common/paperContainer";
import FullPageLayout from "@components/Layout/FullPageLayout";
import StandardLayout from "@components/Layout/StandardLayout";
import Typography from "@mui/material/Typography";
import AllSettings from "@components/settings/allSettings";
export default function Settings() {
  return (
    <StandardLayout title="Settings" menuCode={"rcloud"}>
      <FullPageLayout>
        <AllSettings />
      </FullPageLayout>
    </StandardLayout>
  );
}
