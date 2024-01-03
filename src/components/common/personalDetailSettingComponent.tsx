import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { IconWrapper } from "./customSvgIcon";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CommonComponentProps from "@customTypes/commonComponentProps";

// type PersonalDetailProps = CommonComponentProps & {
//   data: any;
//   handleClick: any;
//   handleDelete: any;
// };
const PersonalDetailSettingComponent = ({
  data,
  handleClick,
  handleDelete,
}: any) => {
  return (
    data?.length > 0 &&
    data?.map((item: any,i:number) => {
      return (
        <>
          <Typography
            fontWeight={400}
            fontSize={14}
            color={(theme) => theme.palette.bgDarkBlack.main}
          >
            {item?.title}
          </Typography>
          <Grid container spacing={1} gap={1} mt={0.1} alignItems={"center"} key={i}>
            {item?.chip?.map((val: any, index: any) => {
              return (
                <Grid key={index} item sx={{ sm: 4, md: 4, lg: 2 }}>
                  <Chip 
                    label={val}
                    onClick={handleClick}
                    onDelete={handleDelete}
                    deleteIcon={
                      <ModeEditOutlineOutlinedIcon color="disabled" />
                    }
                    color="primary"
                    variant="outlined"
                    sx={{
                      p: "4px",
                      height: "26px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                </Grid>
              );
            })}
            <Box display={"flex"} flexDirection={"row"} gap={2} ml={1}>
              {item?.plus}
              {item?.upload}
            </Box>
          </Grid>
        </>
      );
    })
  );
};

export default PersonalDetailSettingComponent;
