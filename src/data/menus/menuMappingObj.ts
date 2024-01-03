import type MenuMappings from "@customTypes/menuMappings";
import PartnerMenus from "./partnerMenus";
import ClientMenus from "./clientMenus";
import RcloudMenus from "./rcloudMenus";


export const MenuMappingObj: MenuMappings = {
  partner: PartnerMenus,
  client: ClientMenus,
  rcloud: RcloudMenus,
};

export default MenuMappingObj;
