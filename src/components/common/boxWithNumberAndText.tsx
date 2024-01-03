import React from "react";
import CommonComponentProps from "@customTypes/commonComponentProps";
import { Typography, Paper, Stack } from "@mui/material";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Grid } from "@mui/material";
type BoxWithNumberAndTextTrend = {
  trendValue?: string;
  vsText?: string;
  compareText?: string;
  isUp?: boolean;
};
type BoxWithNumberAndTextProps = CommonComponentProps & {
  numberText?: string;
  numberTextColor?: string;
  numberTextSize?: "large" | "medium";
  secondaryText?: string;
  caption?: string;
  trend?: BoxWithNumberAndTextTrend;
  minHeight?: number;
};
export default function BoxWithNumberAndText({
  numberText,
  numberTextColor,
  numberTextSize = "medium",
  secondaryText,
  caption,
  trend,
  minHeight,
}: BoxWithNumberAndTextProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, minHeight: minHeight, borderRadius:"10px" }}>
      <Stack spacing={2}>
      {trend && (
            <Typography
              variant="caption"
              color={trend.isUp ? "primary" : "error"}
              component="p"
              lineHeight={1}
              mt={1}
              display="flex"
              alignItems={"center"}
              justifyContent="center"
            >
              {trend.isUp ? (
                <ArrowDropUpOutlinedIcon color="inherit" />
              ) : (
                <ArrowDropDownOutlinedIcon color="inherit" />
              )}{" "}
              {trend.trendValue} {trend.vsText || "vs"} {trend.compareText}
            </Typography>
          )}
        <Typography
          textAlign={"center"}
          fontWeight="bold"
          variant={numberTextSize == "medium" ? "h5" : "h4"}
          color={numberTextColor || "textPrimary"}
        >
          {numberText}
        </Typography>
        <Typography
          textAlign={"center"}
          fontWeight="bold"
          variant="caption"
          color={(theme) => theme.palette.bgGray.main}
          lineHeight={1}
        >
          {secondaryText}
          {caption && (
            <Typography
              textAlign={"center"}
              variant="caption"
              color="textPrimary"
              component="p"
              lineHeight={1}
              gutterBottom
            >
              {caption}
            </Typography>
          )}
          
        </Typography>
      </Stack>
    </Paper>
  );
}
