import React from 'react'
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  });

const ProfileSteper = ({step}:any) => {
    console.log('------------------step',step)
  return (
    <Grid container spacing={2} mt={6} alignItems="stretch">
    <Grid item xs>
      <Box
        border="1px solid"
        bgcolor={(theme) => theme.palette.bgLightGreen.main}
        color={(theme) => theme.palette.bgWhite.main}
        p={0.6}
        borderRadius="8px 0 0 8px"
      >
        {`${step>1?step>2?"100%":"70%":"40%"} completed`}
      </Box>
      <Typography
        ml={1}
        fontSize="12px"
        color={(theme) => theme.palette.bgLightGreen.main}
        fontWeight={700}
      >
        Step 1 : About Partner
      </Typography>
    </Grid>
    <Grid item xs>
      <Box
        border="1px solid"
        bgcolor={(theme) => step<2?theme.palette.bgLightGray.main:theme.palette.bgLightGreen.main}
        color={(theme) => theme.palette.bgWhite.main}
        p={0.6}
      >
        {/*step< 40% completed */}&nbsp;
      </Box>
      <Typography
        ml={1}
        fontSize="12px"
        color={(theme) => step<2?theme.palette.bgLightGray.main:theme.palette.bgLightGreen.main}
        fontWeight={700}
      >
        Step 2 : Compliance Information
      </Typography>
    </Grid>
    <Grid item xs>
      <Box
        border="1px solid"
        bgcolor={(theme) => step<3?theme.palette.bgLightGray.main:theme.palette.bgLightGreen.main}
        color={(theme) => theme.palette.bgWhite.main}
        p={0.6}
      borderRadius="0 8px 8px 0"
      >
        {/* 40% completed */}&nbsp;
      </Box>
      <Typography
        ml={1}
        fontSize="12px"
        color={(theme) => step<3?theme.palette.bgLightGray.main:theme.palette.bgLightGreen.main}
        fontWeight={700}
      >
        Step 3 : Documents
      </Typography>
    </Grid>
  </Grid>
  )
}

export default ProfileSteper