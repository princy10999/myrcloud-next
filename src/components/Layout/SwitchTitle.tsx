import React from "react";
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  display: "flex",
  "&:active": {
      "& .MuiSwitch-thumb": {
          width: 20,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
          transform: "translateX(20px)",
      },
  },
  "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
          transform: "translateX(20px)",
          color: "#fff",
          "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1BA39C",
          },
      },
  },
  "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 20,
      height: 20,
      borderRadius: 10,
      transition: theme.transitions.create(["width"], {
          duration: 200,
      }),
  },
  "& .MuiSwitch-track": {
      borderRadius: 44 / 2,
      opacity: 1,
      backgroundColor:
          theme.palette.mode === "dark"
              ? "rgba(255,255,255,.35)"
              : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
  },
}));
export default function SwitchTitle({ title,switchName1,switchName2,onChange,name,value,defaultChecked ,readOnly}: any) {
  return (
    <>
      <Box mt={title && 2} gap={2} >
        {title && <Typography fontSize={14} fontWeight={400}>{title}</Typography>}
        <Box display={"flex"} alignItems="center">
       {switchName1 && <Typography
        marginRight={1}
          fontSize={14}
          fontWeight={400}
          color={(theme) => theme.palette.bgBlack.main}
        >
          {switchName1}
        </Typography>}
        <AntSwitch
          checked={defaultChecked}
          value={value}
          name={name}
          onChange={onChange}
          inputProps={{ "aria-label": "ant design" }}
          readOnly={readOnly}
          />
       {switchName2 && <Typography
        marginLeft={1}
          fontSize={14}
          fontWeight={400}
          color={(theme) => theme.palette.bgBlack.main}
          >
          {switchName2}
        </Typography>}
        </Box>
      </Box>
    </>
  );
}
