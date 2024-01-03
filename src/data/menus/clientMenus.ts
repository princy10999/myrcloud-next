import type { StandardMenu } from "@customTypes/menuMappings";

const menus: StandardMenu = {
  menuCode: "client",
  description: "client",
  path: "/client",
  icon: "",
  isActive: true,
  subMenus: [
    {
      menuCode: "client-dashboard",
      description: "Dashboard",
      path: "/client",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "client-requisition",
      description: "Requisition",
      path: "/client/create-requisition",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "client-candidates",
      description: "Candidates",
      path: "/partner/view-candidate-list",
      icon: "",
      isActive: true,
    },
    {
      menuCode: "client-profile",
      description: "My Profile",
      path: "/client/profile",
      icon: "",
      isActive: true,
    },
  ],
};

export default menus;
