import React from "react";
import LoginForm from "@components/auth/loginForm";
import LoginLayout from "@components/Layout/LoginLayout";
import LeftSideInfo from "@components/auth/leftSideInfo";
import { Box, Grid, Typography } from "@mui/material";

import type CommonComponentProps from "@customTypes/commonComponentProps";
import type { LeftSideInfoProps } from "@components/auth/leftSideInfo";

type LoginSignupContainerProps = CommonComponentProps &
  LeftSideInfoProps & {
    noHeader?: boolean;
    noMarginTop?: boolean;
    marginTop?: any;
    onlyRightSide?: boolean;
  };
export default function LoginSignupContainer(props: LoginSignupContainerProps) {
  return (
    <LoginLayout noHeader={props.noHeader}>
      <Box className="signup">
        <Grid container>
          {!props.onlyRightSide && (
            <Grid
              item
              lg={7}
              md={6}
              xs={8}
              display={{ xs: "none", md: "block" }}
              mt={
                props.noMarginTop
                  ? 0
                  : props.marginTop
                  ? props.marginTop
                  : {  lg: 16, md: 20, sm: 15, xs: 15 }
              }
            >
              <LeftSideInfo
                line1={props.line1}
                line2={props.line2}
                imgSrc={props.imgSrc}
                imgSrc2={props.imgSrc2}
                subText={props.subText}
                imgSrc2MaxWidth={props.imgSrc2MaxWidth}
              />
            </Grid>
          )}
          <Grid
            item
            lg={props.onlyRightSide ? 12 : 5}
            md={props.onlyRightSide ? 12 : 6}
            xs={12}
            textAlign={"center"}
            width={"100%"}
          >
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </LoginLayout>
  );
}
