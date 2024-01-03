import React from "react";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  Typography,
  Box,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";

const useStyles = makeStyles()((theme) => {
  return {
    accord: {
      fontSize: "14px",
      fontWeight: 700,
    },
  };
});
const RequisitionFilter = ({ setIsFilterOpen }: any) => {
  const { classes } = useStyles();
  const marks = [
    {
      value: 0,
      label: "5L",
    },
    {
      value: 20,
      label: "7L",
    },
    {
      value: 37,
      label: "8L",
    },
    {
      value: 100,
      label: "10L",
    },
  ];
  function valuetext(value: number) {
    return `${value}Lac`;
  }
  return (
    <Box sx={{ marginTop: 0}}>
      <Stack
        p={1}
        justifyContent={"space-between"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        // gap={2}
      >
        <Box
          flexDirection={"row"}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Assets src={`/icon/filterIcon.svg`} height={14} />
          <Typography variant="body1" fontWeight={600}>
            Filters
          </Typography>
        </Box>
        <Box
          flexDirection={"row"}
          display={"flex"}
          alignItems={"center"}
          gap={3}
        >
          <Avatar
            sx={{
              bgcolor: "#EAF4FE",
              width: 30,
              height: 30,
              fontSize: 14,
              color: "gray",
            }}
          >
            7
          </Avatar>
          <Assets
            src={`/icon/close-drawer.svg`}
            height={16}
            onClick={() => setIsFilterOpen(false)}
          />
        </Box>
      </Stack>
      <Stack marginTop={3} >
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down"/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Company</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="TCS"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="HDFC"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="JP Morgon"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Capgimini"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Salary</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <Box sx={{ width: 200 }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={20}
                      getAriaValueText={valuetext}
                      step={10}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </Box>
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down" /> }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Job Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Permanent"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Contract"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remote"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Function</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Permanent"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Contarct"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remote"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Location</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Mumbai"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Delhi"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Banglore"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Gujrat"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack spacing={1} sx={{ width: 200 }} className="margindropdown">
          <Accordion>
            <AccordionSummary
              expandIcon={<IconWrapper fontSize="20px" icon="down" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                flexDirection: "row-reverse",
                gap: 2,
              }}
            >
              <Typography className={classes.accord}>Industry</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="IT"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Bank"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="BPO"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Back Office"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
      {/* <Stack direction="column" spacing={5} marginTop={2}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize={"large"} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            flexDirection: "row-reverse",
            gap: 2,
          }}
        >
          <Typography fontSize={"14px"} fontWeight={700}>
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} sx={{ border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize={"large"} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ flexDirection: "row-reverse", gap: 2 }}
        >
          <Typography fontSize={"14px"} fontWeight={700}>
            Salary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} sx={{ border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize={"large"} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ flexDirection: "row-reverse", gap: 2 }}
        >
          <Typography fontSize={"14px"} fontWeight={700}>
            Location
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} sx={{ border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize={"large"} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ flexDirection: "row-reverse", gap: 2 }}
        >
          <Typography fontSize={"14px"} fontWeight={700}>
            Industry
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} sx={{ border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize={"large"} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ flexDirection: "row-reverse", gap: 2 }}
        >
          <Typography fontSize={"14px"} fontWeight={700}>
            Education
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack> */}
    </Box>
  );
};

export default RequisitionFilter;
