import { Box, Chip, Typography } from "@mui/material";
import React from "react";

interface ReqPositionDetails {
  reqId: number;
  title: string;
  clientName: string;
  location: string;
  color?: string;
  label?: string;
}

export default function ReqPositionDetails(props: ReqPositionDetails) {
  const { reqId, title, clientName, location, color, label } = props;
  return (
    <>
      <Box mb={0.5}>
        {label && (
          <Chip
            label={label}
            color={"error"}
            size="small"
            sx={{
              fontSize: "0.6rem",
              borderRadius: "12px",
              height: "16px",
              mr: 1,
            }}
          />
        )}

        <Typography
          variant="caption"
          lineHeight={1}
          color="textSecondary"
          fontSize={"10px"}
        >
          Req ID -{" "}
          <Box
            sx={{ color: (theme) => theme.palette.primary.main }}
            display="inline"
          >
            {reqId}
          </Box>
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight={"bold"}>
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary" fontWeight={"bold"}>
        {clientName}
      </Typography>
      <Typography variant="caption" lineHeight={1} color="textSecondary">
        {location}
      </Typography>
    </>
  );
}
