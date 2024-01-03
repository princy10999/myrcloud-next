import { Box, IconPropsColorOverrides, Paper, Typography } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import React from "react";

export type ReqStageCardProps = {
  stageName?: String;
  isSelected?: boolean;
  stageCount?: String;
  color?: any;
  onClick?: React.MouseEventHandler;
};

export default function ReqStagesCard({
  stageName,
  stageCount,
  color,
  isSelected,
  onClick,
}: ReqStageCardProps) {
  return (
    <Box
    boxShadow={isSelected ? "0 4px 10px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08)" : 0}
      sx={{
        borderTop: "6px solid",
        borderTopColor: color,
        padding: "4px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: "80%",
        cursor: "pointer",
        borderRadius: "5px",
        textAlign: "center",
        backgroundColor: isSelected
          ? (theme) => theme.palette.bgWhite.main
          : (theme) => theme.palette.bgLightGray.main,
        color: (theme) => theme.palette.text.primary,
      }}
      onClick={onClick}
    >
      <Typography
        variant="caption"
        fontWeight={700}
        textAlign={"center"}
        padding={"2px 4px"}
        sx={{
          backgroundColor: isSelected
            ? (theme) => theme.palette.bgTrendRed.main
            : "",
          borderRadius: "5px",
        }}
      >
        {stageCount}
      </Typography>
      <Typography
        fontSize={12}
        marginLeft={0}
        fontWeight={isSelected ? 700 : 400}
      >
        {stageName}
      </Typography>
    </Box>
  );
}
