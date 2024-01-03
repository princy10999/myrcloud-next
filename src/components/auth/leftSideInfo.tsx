import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { convertAssetsPath } from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import Assets from "@components/common/image_container";
const useStyles = makeStyles()((theme: any) => {
  return {
    img: {
      width: "50%",
      height: "60%",
      [theme.breakpoints.up("xs")]: {
        width: "80%",
        height: "80%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "80%",
        height: "80%",
      },
      [theme.breakpoints.up("md")]: {
        width: "80%",
        height: "80%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "100%",
        height: "80%",
      },
      [theme.breakpoints.up("xl")]: {
        width: "90%",
        height: "80%",
      },
    },
  };
});

export type LeftSideInfoProps = {
  line1?: string;
  line2?: string;
  imgSrc?: string;
  imgSrc2?: string;
  subText?: string;
  imgSrc2MaxWidth?: any;
};
export default function LeftSideInfo(props: LeftSideInfoProps) {
  const { classes } = useStyles();
  return (
    <>
      <Typography
        variant={"h3"}
        fontWeight="bold"
        sx={{
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          marginLeft: { xl: 9, lg: 9, md: 8, sm: 5, xs: 10 },
          fontSize: {
            xl: "50px",
            lg: "40px",
            md: "30px",
            sm: "20px",
            xs: "30px",
          },
        }}
      >
        {props.line1}
        {props.line2 && (
          <Typography variant="inherit"> {props.line2}</Typography>
        )}
      </Typography>
      {props.imgSrc && (
        <Box
          maxWidth={900}
          height={320}
          m="0px auto"
          mt={1}
          sx={{
            backgroundImage: `url(${convertAssetsPath(props.imgSrc)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <Assets className={classes.img} src={props.imgSrc} /> */}
        </Box>
      )}
      {props.imgSrc2 && (
        <Box maxWidth={props.imgSrc2MaxWidth || 400} m="0px auto" mt={1}>
          <Assets className={classes.img} src={props.imgSrc2} />
        </Box>
      )}
      {props.subText && (
        <Box maxWidth={400} m="0px auto" mt={1}>
          <Typography
            variant={"subtitle2"}
            color="textSecondary"
            textAlign={"center"}
          >
            {props.subText}
          </Typography>
        </Box>
      )}
    </>
  );
}
