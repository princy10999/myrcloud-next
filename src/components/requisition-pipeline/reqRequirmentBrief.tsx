import { Grid, LinearProgress, Typography, Box, Stack } from "@mui/material";
import React from "react";
interface ReqRequirmentProps {
  noOfPosition: number;
  providedCVCount?: number;
  CVLimit?: number;
  CTC: string;
  Exp: string;
  showCvLimitBar?: boolean;
}
export default function ReqRequirmentBrief(props: ReqRequirmentProps) {
  const {
    noOfPosition,
    CVLimit,
    providedCVCount = 0,
    CTC = 0,
    Exp,
    showCvLimitBar = true,
    ...other
  } = props;
  return (
    <>
      <Stack direction="column" width={"100%"} display={"flex"}>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="caption" color="textSecondary" width={"100px"}>
            No. of Positions
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {noOfPosition}
          </Typography>
        </Box>
        {CVLimit ? (
          <Box display={"flex"} flexDirection={"row"}>
            <Typography variant="caption" color="textSecondary" width={"100px"}>
              CV Limit
            </Typography>

            <Box
              flexDirection={"row"}
              display={"flex"}
              justifyContent={"center"}
            >
              {showCvLimitBar ? (
                <Box width={"64px"} mt={1} mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={((providedCVCount || 0) * 100) / CVLimit}
                  />
                </Box>
              ) : null}

              <Typography variant="caption" color="textSecondary">
                {showCvLimitBar ? (providedCVCount || 0) + "/" : ""}
                {CVLimit}
              </Typography>
            </Box>
          </Box>
        ) : null}
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="caption" color="textSecondary" width={"100px"}>
          Salary
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {CTC}
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography variant="caption" color="textSecondary" width={"100px"}>
            Exp
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {Exp}
          </Typography>
        </Box>
      </Stack>
      {/* <Stack direction="row" width={"100%"} spacing={2}>
        <Stack>
          <Typography variant="caption" color="textSecondary">
            No. of Positions
          </Typography>
          <Typography variant="caption" color="textSecondary">
            CV Limit
          </Typography>
          <Typography variant="caption" color="textSecondary">
            CTC
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Exp
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="caption" color="textPrimary">
            {noOfPosition}
          </Typography>
          <Typography variant="caption" color="textPrimary">
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <Box width={"64px"}>
                <LinearProgress
                  variant="determinate"
                  value={(providedCVCount * 100) / CVLimit}
                />
              </Box>
              <span>{CVLimit + "/" + providedCVCount}</span>
            </Stack>
          </Typography>
          <Typography variant="caption" color="textPrimary">
            {CTC}
          </Typography>
          <Typography variant="caption" color="textPrimary">
            {Exp}
          </Typography>
        </Stack>
      </Stack> */}
    </>
  );
}
