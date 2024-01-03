import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import DashboardHeader from "@components/dashborad-header";
import Demand from "@pages/rcloud/demand";
import BusinessHealth from "@pages/rcloud/business-health";
import Supply from "@pages/rcloud/supply";
import Productivity from "@pages/rcloud/productivity";
import FullPageLayout from "@components/Layout/FullPageLayout";

const Index = () => {
  return (
    <StandardLayout
      title="MyRCloud Dashboard (For Flow connectivity Purposes)"
      menuCode="rcloud"
    >
      <DashboardHeader />
      <FullPageLayout>      
      <Demand />
      <BusinessHealth />
      <Supply />
      <Productivity />
      </FullPageLayout>
    </StandardLayout>
  );
};

export default Index;
