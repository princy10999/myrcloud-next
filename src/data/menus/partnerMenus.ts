import type { StandardMenu } from "@customTypes/menuMappings";

const menus: StandardMenu = {
  menuCode: "partner",
  description: "Partner",
  path: "/partner",
  icon: "",
  isActive: true,
  subMenus: [
    {
      menuCode: "partner-dashboard",
      description: "Dashboard",
      path: "/partner",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "partner-requisition",
      description: "Requisition",
      path: "/partner/requisition-pipeline",
      icon: "",
      isActive: true,
    },
    // {
    //   menuCode: "partner-list",
    //   description: "Partners (Temporary Menu)",
    //   path: "/partner/psm-list",
    //   icon: "",
    //   isActive: true,
    // },
    // {
    //   menuCode: "partner-candidates",
    //   description: "Candidates",
    //   path: "/partner/view-candidate-list",
    //   icon: "",
    //   isActive: true,
    // },
    {
      menuCode: "partner-profile",
      description: "My Profile",
      path: "/partner/profile",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "partner-reports",
      description: "Reports",
      path: "/partner/reports",
      icon: "",
      isActive: true,
    },
  ],
};

export default menus;
