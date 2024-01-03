import { IconWrapper } from "@components/common/customSvgIcon";
import MachineLearningSwitch from "@components/common/machineLearningSwitch";
import CandidateListHeader from "@components/view-candidate-list/candidateListHeader";
import CandidateListTableView from "@components/view-candidate-list/candidateListTableView";
import ReqStagesCard from "@components/view-candidate-list/reqStagesCard";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ViewCandidateList() {
  const [selectedView, setSelectedView] = useState<String>("table");
  const [selectedStage, setSelectedStage] = useState<String>("");

  const stages = [
    {
      stageName: "Sourcing",
      stageCount: "15",

      color: (theme: any) => theme.palette.warning.main,
    },
    {
      stageName: "Screening",
      stageCount: "10",
      color: (theme: any) => theme.palette.warning.main,
    },
    {
      stageName: "CV Submitted",
      stageCount: "08",
      color: (theme: any) => theme.palette.warning.main,
    },
    {
      stageName: "Interview Pending",
      stageCount: "08",
      color: (theme: any) => theme.palette.warning.main,
    },
    {
      stageName: "Round 1 ",
      stageCount: "05",
      color: (theme: any) => theme.palette.bgBlue.main,
    },
    {
      stageName: "Round 2 ",
      stageCount: "05",
      color: (theme: any) => theme.palette.bgBlue.main,
    },
    {
      stageName: "Round 3 ",
      stageCount: "05",
      color: (theme: any) => theme.palette.bgBlue.main,
    },
    {
      stageName: "HR Round",
      stageCount: "03",
      color: (theme: any) => theme.palette.bgBlue.main,
    },
    {
      stageName: "Offered",
      stageCount: "02",
      color: (theme: any) => theme.palette.bgSuccess.main,
    },
    {
      stageName: "Offer Accepted",
      stageCount: "11111111",
      color: (theme: any) => theme.palette.bgSuccess.main,
    },
    {
      stageName: "Joined",
      stageCount: "01",
      color: (theme: any) => theme.palette.primary.main,
    },
    {
      stageName: "QC Rejected",
      stageCount: "01",
      color: (theme: any) => theme.palette.error.main,
    },
    {
      stageName: "Client Rejected",
      stageCount: "01",
      color: (theme: any) => theme.palette.error.main,
    },
  ];
  return (
    <>
      <CandidateListHeader />
      <Stack
        direction="row"
        margin={"32px 16px"}
        justifyContent={"space-between"}
      >
        <CustomAutoCompleteCandidate></CustomAutoCompleteCandidate>
        {/* <Stack direction="row" alignItems={"center"}>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Assistant Store Manager - DMart India
          </Typography>
          <Chip
            variant="outlined"
            label="Open"
            color="info"
            size="small"
            icon={
              <IconWrapper
                fontSize="inherit"
                color="info"
                icon="filled-circle"
                style={{
                  fontSize: "8px",
                }}
              />
            }
            sx={{
              marginLeft: "12px",
              paddingLeft: "8px",
              paddingRight: "8px",
              color: (theme) => theme.palette.info.main,
            }}
          ></Chip>
          <IconButton
            sx={{
              borderRadius: "5px",
              fontSize: "14px",
              height: "24px",
              width: "24px",
              marginLeft: "12px",
              backgroundColor: (theme) => theme.palette.bgTrendGreen.main,
            }}
          >
            <IconWrapper fontSize="inherit" icon="menu-dots" color="primary" />
          </IconButton>
        </Stack> */}
        <Stack direction="row">
          {/* <MachineLearningSwitch/> */}
          <FormControlLabel
            control={<Switch color="primary" defaultChecked />}
            label="Active - Machine Learning"
            labelPlacement="end"
          />
          {/* <Stack
            direction="row"
            marginLeft={"12px"}
            bgcolor={(theme) => theme.palette.bgWhite.main}
            alignItems={"center"}
            padding={1}
            borderRadius={"5px"}
          >
            <Button
              disableElevation
              variant={selectedView == "card" ? "contained" : "text"}
              size="small"
              onClick={() => {
                setSelectedView("card");
              }}
              startIcon={
                <IconWrapper
                  fontSize="inherit"
                  icon="menu-list"
                  color="inherit"
                />
              }
            >
              Card View
            </Button>
            <Button
              disableElevation
              size="small"
              variant={selectedView == "table" ? "contained" : "text"}
              onClick={() => {
                setSelectedView("table");
              }}
              sx={{
                marginLeft: "8px",
                marginRight: "8px",
              }}
              startIcon={
                <IconWrapper
                  fontSize="inherit"
                  icon="grid-layout"
                  color="inherit"
                />
              }
            >
              Table view
            </Button>
            <Button
              disableElevation
              size="small"
              variant={selectedView == "kanban" ? "contained" : "text"}
              onClick={() => {
                setSelectedView("kanban");
              }}
              startIcon={
                <IconWrapper fontSize="inherit" icon="filter" color="inherit" />
              }
            >
              Kanban View
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
      <Box margin={"16px 16px"}>
        <Breadcrumbs
          separator={
            <IconWrapper
              fontSize="inherit"
              icon="next"
              color="inherit"

            />
          }
        >
          {stages.map((item, index) => {
            return (
              <Box key={index}>
                <ReqStagesCard
                  stageName={item.stageName}
                  stageCount={item.stageCount}
                  color={item.color}
                  isSelected={item.stageName == selectedStage ? true : false}
                  onClick={() => {
                    setSelectedStage(item.stageName);
                  }}
                />
              </Box>
            );
          })}
        </Breadcrumbs>
      </Box>
      <Divider />
      {/* {selectedView == "card" ? (
        <div>card biew</div>
      ) : selectedView == "table" ? ( */}
      <CandidateListTableView />
      {/* ) : (
        // <div>table view</div>
        <div>kanban view</div>
      )} */}
    </>
  );
}

const CustomAutoCompleteCandidate = ({ options, value }: any) => {
  const selectedValue = {
    designation: "Assistant Store Manager - DMart India",
    status: "Open",
    priority: "High",
    id: 2562,
    location: "Banglore",
    postedOn: "Posted 3 days ago",
  };
  return (
    <Autocomplete
      options={options || []}
      onChange={(event: any, newValue: any) => {
        console.log(newValue);
      }}
      value={selectedValue}
      sx={{
        width: "50%",
        backgroundColor: "white",
      }}
      getOptionLabel={(option) => option.designation}
      renderInput={(params: any) => (
        <TextField
          {...params}
          onChange={(event: any) => {}}
          size="small"
          InputProps={{
            startAdornment: (
              <>
                <IconWrapper fontSize="inherit" icon="search" color="primary" />
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    marginLeft: "12px",
                  }}
                />
              </>
            ),
          }}
        />
      )}
    ></Autocomplete>
  );
};
