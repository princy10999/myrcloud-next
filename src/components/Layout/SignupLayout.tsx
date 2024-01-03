import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import getConfig from "next/config";
import type CommonComponentProps from "@customTypes/commonComponentProps";
import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Assets from "@components/common/image_container"
const { publicRuntimeConfig } = getConfig();

const pages = [
  "Home",
  "Enterprise",
  "Recruiters",
  "Knowledge Hub",
  "Media",
  "FAQ",
  "Contact Us",
];
export default function SignUpLayout(props: CommonComponentProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar variant="outlined" color="inherit" position="static">
        <Container maxWidth="lg">
          <Toolbar variant="dense" sx={{ height: { xs: 48, sm: 60 } }}>
            <Box sx={{ height: "100%", display: { xs: "none", sm: "block" } }}>
             
               <Assets src={`/assets/img/myrcloud_logo.png`}
                width="100%"
                height={"100%"} />

            </Box>
            <Box
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
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button color="primary" variant="outlined" disableElevation>
                Login
              </Button>
              <Button color="primary" variant="contained" disableElevation>
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {props.children}
    </Box>
  );
}
