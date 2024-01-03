import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonContained from "@components/Layout/ButtonContained";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import StandardLayout from "@components/Layout/StandardLayout";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function CandidateListHeader() {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{
          boxShadow: "none",
          backgroundColor: (theme) => theme.palette.bgWhite.main,
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        <Stack
          direction="row"
          margin={2}
          marginLeft={"auto"}
          alignItems={"flex-end"}
          alignContent={"flex-end"}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Candidates ... "
            InputProps={{
              startAdornment: (
                <>
                  <IconWrapper
                    fontSize="inherit"
                    icon="search"
                    color="primary"
                  />
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
          <IconButton
            sx={{
              fontSize: "12px",
              height: "40px",
              width: "40px",
              marginLeft: "12px",
              marginRight:"12px",
              backgroundColor: (theme) => theme.palette.bgLightGray.main,
            }}
          >
            <IconWrapper fontSize="inherit" icon="filter" color="primary" />
          </IconButton>
          <Button
            variant="contained"
            disableElevation
            sx={{
              borderRadius: "30px",
            }}
            endIcon={
              <IconWrapper
                fontSize="small"
                icon="plus-symbol"
                color="inherit"
              />
            }
          >
            Add Candidate
          </Button>
        </Stack>
        {/* <Stack
          direction="row"
          margin={2}
          alignItems={"center"}
          alignContent={"flex-start"}
        >
          <Stack direction="row" alignItems={"center"}>
            <IconButton
              sx={{
                border: "1px solid ",
                height: "36px",
                width: "36px",
                borderColor: (theme) => theme.palette.primary.main,
                fontSize: "12px",
              }}
            >
              <IconWrapper fontSize="inherit" icon="back" color="primary" />
            </IconButton>
            <Stack direction="column" marginLeft={2}>
              <Stack direction="row" alignItems={"center"}>
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
                  <IconWrapper
                    fontSize="inherit"
                    icon="menu-dots"
                    color="primary"
                  />
                </IconButton>
              </Stack>

              <Typography variant="caption" color={"textSecondary"}>
                Bangalore Posted 3 days ago
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems={"center"} marginLeft={"auto"}>
          <TextField
              variant="outlined"
              size="small"
              placeholder="Search Candidates ... "
              fullWidth
              InputProps={{
                startAdornment: (
                  <>
                    <IconWrapper
                      fontSize="inherit"
                      icon="search"
                      color="primary"
                    />
                    <Divider orientation="vertical" flexItem sx={{
                        marginLeft:"12px"
                    }}/>
                  </>
                ),
              }}
            />
            <IconButton
              sx={{
                fontSize: "12px",
                height: "40px",
                width: "40px",
                backgroundColor: (theme) => theme.palette.bgLightGray.main,
              }}
            >
              <IconWrapper fontSize="inherit" icon="filter" color="primary" />
            </IconButton>
            <Button
              variant="contained"
              disableElevation
              sx={{
                borderRadius: "30px",
                marginLeft: "12px",
              }}
              endIcon={
                <IconWrapper
                  fontSize="small"
                  icon="plus-symbol"
                  color="inherit"
                />
              }
            >
              Add Candidate
            </Button>
          </Stack>
        </Stack> */}
      </AppBar>
    </>
  );
}
