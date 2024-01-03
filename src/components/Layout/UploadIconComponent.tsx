import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { IconWrapper } from "@components/common/customSvgIcon";
export default function UploadIconComponent({onClick}:any) {
  return (
    <Box sx={{ '& > :not(style)': { m: 0, mr:0, ml:0 } }}>
      <Fab size="small" color="primary" aria-label="add">
      <IconWrapper icon="upload" onClick={onClick} color="inherit" fontSize="10px" />
      </Fab>
    </Box>
  );
}