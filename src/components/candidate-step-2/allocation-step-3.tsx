import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Box, useTheme } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import DropDownComponent from '@components/Layout/DropDownComponent';
import { Grid } from '@mui/material';
import { IconWrapper } from '@components/common/customSvgIcon';
import StyledAccordian from '@components/common/styledAccordian';
import StyledAccordianSummary from '@components/common/styledAccordianSummary';
import StyledAccordianDetails from '@components/common/styledAccordianDetail';

const manager = ["Select", "Aakash", "Mehul", "Sagar", "Reyansh"];
const Coordinator = ["Select", "divya", "shruti", "nayana", "chelsi"];
const qcManager = ["Select", "arjun", "ranbir", "Sagar", "rita"];

export default function Allocation({ editRequisitionData }: any) {
  const theme = useTheme();
  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian>
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="small" icon="down" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              fontWeight={"inherit"}
            >
              Allocation Details
            </Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Typography
              fontWeight={600}
              marginTop={2}
              mb={1}
              fontSize={"18px"}
            >
              Allocation Details
            </Typography>
            <Box
              display="flex"
              color={(theme) => theme.palette.bgGray.main}
            >
              <IconWrapper fontSize="small" icon="information" color="inherit" />
              <Typography
                marginLeft={"8px"}
                color={(theme) => theme.palette.bgGray.main}
              >
                Please mention the allocation details for the requisition
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={"20px"}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12} sm={6}>
                  <DropDownComponent
                    text="Account Manager"
                    values={manager}
                    width="100%"
                    defaultValue={manager[0]}
                    disabled
                    defaultChecked
                    labelSize={"14px"}
                    labelColor={theme.palette.bgGray.main}
                  />
                </Grid>
                <Grid item md={4} xs={12} sm={6}>
                  <DropDownComponent
                    text="Coordinator"
                    defaultValue={Coordinator[0]}
                    values={Coordinator}
                    width="100%"
                    labelSize={"14px"}
                    labelColor={theme.palette.bgGray.main}
                  />
                </Grid>
                <Grid item md={4} xs={12} sm={6}>
                  <DropDownComponent
                    text="QC Manager"
                    defaultValue={qcManager[0]}
                    values={qcManager}
                    width="100%"
                    labelSize={"14px"}
                    labelColor={theme.palette.bgGray.main}
                  />
                </Grid>
              </Grid>
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box></>
  )
}

