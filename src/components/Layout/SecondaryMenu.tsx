import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/router";
import MenuMappingObj from "@data/menus/menuMappingObj";
import { checkUserTypes } from "@redux/Api/ClientHelper";
interface LinkTabProps {
  label?: string;
  href?: string;
  value?: any;
}

function LinkTab(props: LinkTabProps) {
  const router = useRouter();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (props.href) router.push(props.href);
      }}
      sx={{ textTransform: "none" }}
      {...props}
    />
  );
}

type SecondaryMenuProps = {
  menuCode?: string;
};

export default function SecondaryMenu({ menuCode }: SecondaryMenuProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(router.asPath);
  const selectedMenu = menuCode ? MenuMappingObj[menuCode] : null;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return selectedMenu ? (
    <Box sx={{ width: "100%" }}>
      <AppBar elevation={0} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="scrollable"
          scrollButtons
          TabIndicatorProps={{
            style: { background: "currentColor", bottom: 6 },
          }}
        >
          {(selectedMenu.subMenus || [])
            .filter((item, idx) => {
              return item.userType && item.userType.length > 0
                ? checkUserTypes({ roles: item.userType })
                : true;
            })
            .map((item, idx) => {
              return (
                <LinkTab
                  key={idx}
                  label={item.description}
                  value={item.path}
                  href={item.path}
                />
              );
            })}
        </Tabs>
      </AppBar>
    </Box>
  ) : null;
}
