export type StandardMenu = {
  menuCode: string;
  description: string;
  path: string;
  icon: string;
  isActive: boolean;
  subMenus?: StandardMenu[];
  userType?: string[];
};
type MenuMappings = {
  [Key: string]: StandardMenu;
};

export default MenuMappings;
