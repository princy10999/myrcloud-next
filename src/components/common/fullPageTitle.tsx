import React from "react";
import { Typography } from "@mui/material";
export default function FullPageTitle({ title }: { title: string }) {
  return (
    <Typography variant="h6" fontWeight="bold">
      {title}
    </Typography>
  );
}
