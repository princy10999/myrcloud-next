import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import getConfig from "next/config";
import type CommonComponentProps from "@customTypes/commonComponentProps";
import { Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Assets from "@components/common/image_container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const pages = [
  "Home",
  "Enterprise",
  "Recruiters",
  "Knowledge Hub",
  "Media",
  "FAQ",
  "Contact Us",
];
const loginSignupLinks = {
  login: [
    { name: "Enterprise", url: "login" },
    { name: "Recruiters", url: "login" },
    { name: "MyRcloud Team", url: "login" },
  ],
  signUp: [
    { name: "Enterprise", url: "sign-up-enterprise" },
    { name: "Recruiters", url: "sign-up" },
  ],
};
type loginSignupAnchors = {
  login: null | HTMLElement;
  signUp: null | HTMLElement;
};

type LoginLayout = CommonComponentProps & {
  noHeader?: boolean;
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))();

export default function LoginLayout(props: LoginLayout) {
  const [anchorEl, setAnchorEl] = React.useState<loginSignupAnchors>({
    login: null,
    signUp: null,
  });
  const handleClick = (event: React.MouseEvent<HTMLElement>, key: string) => {
    setAnchorEl((x) => ({ ...x, [key]: event.currentTarget }));
  };
  const handleClose = (key: string) => {
    setAnchorEl((x) => ({ ...x, [key]: null }));
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!props.noHeader && (
        <AppBar
          elevation={0}
          variant={"outlined"}
          sx={{ borderTop: 0 }}
          color="inherit"
          // position="sticky"
        >
          <Container maxWidth="lg">
            <Toolbar variant="dense" disableGutters sx={{ height: { xs: 48, sm: 60 } }}>
              <Box
                sx={{ height: "100%", flexShrink: 0, display: { sm: "block" } }}
              >
                <Assets
                  src={`/assets/img/myrcloud_logo.png`}
                  width="100%"
                  height={"100%"}
                />
              </Box>
              {/* <Box
                sx={{ flexGrow: 1, ml: 6, display: { xs: "none", md: "flex" } }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    //onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                    color="inherit"
                  >
                    {page}
                  </Button>
                ))}
              </Box> */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  flexShrink: 0,
                  display: { xs: "none", md: "flex" },
                  ml: "auto",
                }}
              >
                <Button
                  //size="small"
                  //href="/login"
                  color="primary"
                  //variant="outlined"
                  disableElevation
                  onClick={(e) => handleClick(e, "login")}
                  endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                >
                  Login
                </Button>

                <StyledMenu
                  anchorEl={anchorEl.login}
                  open={Boolean(anchorEl.login)}
                  onClose={(e) => handleClose("login")}
                >
                  {loginSignupLinks.login.map((item, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        onClick={(e) => handleClose("login")}
                        dense
                      >
                        <Link href={item.url}>
                          <Typography fontWeight="bold" variant="subtitle2">
                            {item.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </StyledMenu>
                <Button
                  //size="small"
                  //href="sign-up"
                  color="primary"
                  variant="outlined"
                  disableElevation
                  onClick={(e) => handleClick(e, "signUp")}
                  endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                >
                  Sign Up
                </Button>
                <StyledMenu
                  anchorEl={anchorEl.signUp}
                  open={Boolean(anchorEl.signUp)}
                  onClose={(e) => handleClose("signUp")}
                >
                  {loginSignupLinks.signUp.map((item, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        onClick={(e) => handleClose("signUp")}
                        dense
                      >
                        <Link href={item.url}>
                          <Typography fontWeight="bold" variant="subtitle2">
                            {item.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </StyledMenu>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      {props.children}
    </Box>
  );
}
