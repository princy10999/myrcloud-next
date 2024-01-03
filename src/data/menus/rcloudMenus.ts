import type { StandardMenu } from "@customTypes/menuMappings";

const menus: StandardMenu = {
  menuCode: "rcloud",
  description: "rcloud",
  path: "/dashboard",
  icon: "",
  isActive: true,
  subMenus: [
    {
      menuCode: "rcloud-dashboard",
      description: "Dashboard",
      path: "/rcloud",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "rcloud-clients",
      description: "Client",
      path: "/rcloud/clients",
      icon: "",
      isActive: true,
      userType: ["csm"],
    },
    {
      menuCode: "rcloud-partners",
      description: "Partner",
      path: "/rcloud/partners",
      icon: "",
      isActive: true,
      userType: ["psm"],
    },
    {
      menuCode: "rcloud-requisition",
      description: "Requisition",
      path: "/rcloud/requisitions",
      icon: "",
      isActive: true,
      userType: ["csm"],
    },
    {
      menuCode: "rcloud-reports",
      description: "Reports",
      path: "/rcloud/reports",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "rcloud-settings",
      description: "Settings",
      path: "/rcloud/settings",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "rcloud-empolyees",
      description: "Empolyees",
      path: "/rcloud/employee",
      icon: "",
      isActive: true,
    },
  ],
};

export default menus;
