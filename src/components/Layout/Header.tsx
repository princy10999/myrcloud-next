import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import getConfig from "next/config";
import Assets from "@components/common/image_container";
import { IconWrapper } from "@components/common/customSvgIcon";
import { Avatar, Divider, Stack } from "@mui/material";
const { publicRuntimeConfig } = getConfig();

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppSelector } from "@redux/Redux/app/hooks";

export type HeaderProps = {
  title?: string;
  menuCode?: string;
  position?: string;
  hasBottomBorder?: boolean;
};

export default function PrimarySearchAppBar(props: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const partnerDetails: any = useAppSelector(
    (state: any) => state?.partner?.isGetPartnerDetail?.partnerDetails
  );
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const menuItems = [
    {
      icon: "user-profile",
      description: "My Profile",
      url: "/partner/profile",
    },
    {
      icon: "key",
      description: "Change Password",
      url: "/password",
    },
    {
      icon: "setting",
      description: "Configuration",
      url: "/partner/configuration",
      onClick: () => {},
    },
    {
      icon: "power",
      description: "Logout",
      url: "/login",
      //onClick: () => {},
    },
  ];
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: "450px",
          width: "28ch",
          borderRadius: "24px",
        },
      }}
      variant="menu"
    >
      <MenuItem disableRipple disableTouchRipple sx={{ pointerEvents: "none" }}>
        <Stack width="100%" alignItems={"center"}>
          <Avatar src={partnerDetails?.partnerLogo} sx={{ width: 60, height: 60, mb: 1 }}>
            <IconWrapper icon="user-profile" />
          </Avatar>
          <Typography fontWeight="bold" variant="body1">
            {partnerDetails?.partnerName}
          </Typography>
          {/* <Typography variant="subtitle2">
            <Typography component="span" fontWeight="bold" variant="inherit">
              Email:{" "}
            </Typography>
            {partnerDetails?.email}
          </Typography> */}
        </Stack>
      </MenuItem>
      <Divider sx={{ my: 1 }}></Divider>
      {menuItems.map((item: any, idx: number) => {
        const ItemWrapper: any = item.url ? Link : React.Fragment;
        return (
          <MenuItem
            key={idx}
            sx={{ mb: 1 }}
            onClick={(e) => {
              if (item.onClick) {
                item.onClick(e);
                handleMenuClose();
                return;
              }
              if (item.url) {
                router.push(item.url);
                handleMenuClose();
                return;
              }
            }}
          >
            <ListItemIcon>
              <IconWrapper icon={item.icon} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: "textSecondary",
              }}
            >
              {item.description}
            </ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography variant={"body1"}>Notifications</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant={"body1"}>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, zIndex: "99999" }}>
      <AppBar
        elevation={0}
        style={{ position: ((props?.position as any) || "inherit") as any }}
        color="inherit"
        position="sticky"
        sx={{
          borderBottom: props.hasBottomBorder
            ? (theme) => `1px solid ${theme.palette.divider}`
            : "",
        }}
      >
        <Toolbar variant="dense" sx={{ height: { xs: 48, sm: 60 } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "inline-flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ height: "100%", display: { xs: "none", sm: "block" } }}>
            <Assets
              src={`/assets/img/myrcloud_logo.png`}
              width="auto"
              height={"100%"}
            />
          </Box>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography fontWeight={"bold"} variant="h6">
              {props.title}
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                {/* <NotificationsIcon /> */}
                <IconWrapper color="action" icon="notification" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <IconWrapper color="action" icon="menu-dots" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
