import React from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
  Fade,
} from "@mui/material";
import ReqPositionDetails from "./reqPositionDetails";
import ReqRequirmentBrief from "./reqRequirmentBrief";
import StatusCard from "./statusCard";
import Assets from "@components/common/image_container";
import { useTheme } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import RequisitionQRDrawer from "./reqQRDrawer";
import usePagination from "@components/common/pagination";
import { Pagination } from "@mui/lab";
import { IconWrapper } from "@components/common/customSvgIcon";
import { makeStyles } from "tss-react/mui";
import { getAcceptRequisitionList } from "@redux/Redux/Actions/PartnerRequisition";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { numDifferentiation } from "@lib/calculateCTC";
import { PriorityType } from "@lib/enum";

const useStyles = makeStyles()((theme) => {
  return {
    flag: {
      position: "absolute",
      right: 64,
    },
  };
});

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#DDDDDD",
  backgroundColor: "white",
  "input:disabled ~ &": {
    boxShadow: "none",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#dddddd",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#1ba39c",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "#1ba39c",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#1ba39c",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

export default function AcceptedRejectedReq({
  tab,
  acceptRequisition,
  page,
  handlePageChange,
  PER_PAGE,
  length,
}: any) {
  //Hooks
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  //State
  const [isQROpen, setIsQROpen] = React.useState(false);
  const [clickedReq, setClickedReq] = React.useState<any>({});
  const [isTrash, setIsIsTrash] = React.useState<number>();
  const [checked, setChecked] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const acceptRejectRequisition = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAcceptRequisitionList?.acceptRequisition
  );

  const acceptReq =
    acceptRequisition.length > 0
      ? acceptRequisition?.map((e: any) => e?.requisition)
      : [];

  const open = Boolean(anchorEl);

  const count = Math.ceil(acceptReq.length / PER_PAGE);
  const _DATA = usePagination(acceptReq, PER_PAGE);

  const handleChangeCheckedRead = (event: any) => {
    setChecked(event.target.checked);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // React.useEffect(() => {
  //   (async () => {
  //     const body = `?IsAccepted=${true}`;
  //     await dispatch(getAcceptRequisitionList(body));
  //   })();
  // }, []);
  return (
    <>
      {tab === 2 && (
        <Grid container spacing={1} marginTop={-1}>
          <Grid
            xs={12}
            direction={"row"}
            display={"flex"}
            justifyContent={"flex-end"}
            gap={3}
          >
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <Box
                height={22}
                width={22}
                bgcolor={theme.palette.bgLightGray.main}
                border={`1px solid #DDDDDD`}
                borderRadius={"5px"}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
              <Typography fontSize={"14px"} fontWeight={400}>
                Unpublished Requisitions
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              flexDirection={"row"}
              gap={1}
            >
              <Box
                height={22}
                width={22}
                bgcolor={theme.palette.bgWhite.main}
                border={`1px solid ${theme.palette.bgWhite.main}`}
                borderRadius={"5px"}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
              <Typography fontSize={"14px"} fontWeight={400}>
                Published Requisitions
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} mt={0.5} alignItems="stretch">
        {_DATA.currentData().map((item: any, idx: any) => {
          console.log(item, "item");
          return (
            <Grid key={idx} item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: isTrash === idx ? "#F5F5F5" : "white",
                }}
              >
                <Grid display={"flex"}>
                  <Grid
                    md={12}
                    lg={12}
                    sm={12}
                    xs={12}
                    display={"flex"}
                    flexDirection={{
                      lg: "row",
                      md: "column",
                      sm: "column",
                      xs: "column",
                    }}
                    p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
                    gap={{ lg: 1, md: 0, sm: 2, xs: 2 }}
                  >
                    <Grid
                      md={12}
                      lg={12}
                      sm={12}
                      xs={12}
                      display={"flex"}
                      flexDirection={{
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                      }}
                      p={{ xs: 1 }}
                      justifyContent={"center"}
                    >
                      <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                        sm={12}
                        alignSelf={"center"}
                        wrap={"wrap"}
                        minWidth="150px"
                      >
                        <ReqPositionDetails
                          reqId={item?.requisitionCode}
                          title={item?.jobTitle}
                          clientName={item?.client?.clientName}
                          location={item?.location}
                          color={item.color}
                          label={PriorityType[item?.priority]}
                        />
                      </Grid>
                      <Grid
                        lg={7}
                        md={6}
                        sm={12}
                        xs={12}
                        display={"flex"}
                        alignSelf={"center"}
                      >
                        <ReqRequirmentBrief
                          noOfPosition={item?.positionCount}
                          providedCVCount={0}
                          CVLimit={parseInt(item?.cvLimit)}
                          CTC={`${numDifferentiation(
                            item?.compensation?.minSalary || 0,
                            0
                          )} - ${numDifferentiation(
                            item?.compensation?.maxSalary || 0,
                            0
                          )}`}
                          Exp={`${
                            item?.workExperience?.minimumYear ||
                            item?.workExperience?.totalMinimumYear ||
                            0
                          } - ${
                            item?.workExperience?.maximumYear ||
                            item?.workExperience?.totalMaximumYear ||
                            0
                          } years`}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      lg={12}
                      sm={12}
                      xs={12}
                      display={"flex"}
                      flexDirection={{
                        lg: "row",
                        md: "row",
                        xs: "column",
                        sm: "column",
                      }}
                      gap={{ lg: 0, md: 1, sm: 2, xs: 2 }}
                      p={{ lg: 1, md: 2, sm: 2, xs: 2 }}
                      justifyContent={"center"}
                    >
                      <Box display={"flex"} flexDirection={"row"} gap={1}>
                        <SourcingStages
                          stage="Sourcing"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Screening"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="CV Submitted"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Interview Pending"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Round 1"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                      </Box>
                      <Box display={"flex"} flexDirection={"row"} gap={1}>
                        <SourcingStages
                          stage="Round 2"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Round 3"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />

                        <SourcingStages
                          stage="HR Round"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Offered"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Offered Accepted"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Joined"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                        />
                        <SourcingStages
                          stage="Rejection"
                          count={"0"}
                          color={theme.palette.bgBlack.main}
                          noBg
                        />
                      </Box>
                    </Grid>
                    <Grid
                      md={12}
                      lg={12}
                      sm={12}
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      p={{ lg: 0, md: 2, sm: 3, xs: 2 }}
                    >
                      <Grid
                        item
                        lg={7}
                        md={7}
                        xs={6}
                        sm={6}
                        display={"flex"}
                        justifyContent="space-evenly"
                        alignSelf={"center"}
                        alignItems="center"
                      >
                        <StatusCard
                          status={
                            item?.requisitionStatus === 1 ? "Open" : "Close"
                          }
                        />
                        <Box
                          bgcolor="#1BA39C"
                          color="white"
                          borderRadius={"100%"}
                          height={"30px"}
                          width={"32px"}
                          display={"flex"}
                          justifyContent={"center"}
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          p={0.8}
                          onClick={(e) => {
                            console.log("click");
                            handleClick(e);
                          }}
                        >
                          <IconWrapper fontSize="5px" icon="menu-dots" />
                        </Box>
                        <Menu
                          id="fade-menu"
                          MenuListProps={{
                            "aria-labelledby": "fade-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          TransitionComponent={Fade}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              borderRadius: "15px",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 3,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: 12,
                                mr: 1,
                              },
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 15,
                                width: 15,
                                height: 15,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                              "&:hover": {
                                cursor: "pointer",
                              },
                              p: 1,
                            },
                          }}
                          transformOrigin={{
                            horizontal: "left",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "left",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            {" "}
                            <Button
                              size="small"
                              onClick={() => {
                                setClickedReq(item);
                                setIsQROpen(true);
                              }}
                              color="inherit"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                gap: 2,
                                p: 0.5,
                                lineHeight: "10px",
                              }}
                            >
                              <IconWrapper
                                fontSize="small"
                                icon="qr"
                                color="primary"
                              />
                              Share QR Code
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            {" "}
                            <Button
                              size="small"
                              onClick={() => {
                                router.push(
                                  `/partner/assistantstore?requisitionId=${item?.requisitionId}&id=1`
                                );
                              }}
                              color="inherit"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                gap: 2,
                                lineHeight: "10px",
                              }}
                            >
                              <IconWrapper
                                fontSize="medium"
                                icon="visibility"
                                color="primary"
                              />
                              View Requisition
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            {" "}
                            <Button
                              size="small"
                              onClick={() => {
                                router.push("/partner/view-candidate-list");
                              }}
                              color="inherit"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                gap: 2,
                                lineHeight: "10px",
                              }}
                            >
                              <IconWrapper
                                fontSize="small"
                                icon="users"
                                color="primary"
                              />
                              View Candidates
                            </Button>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              size="small"
                              onClick={() => {
                                router.push({
                                  pathname: "/partner/add-candidate",
                                  query: {
                                    requisitionId: item?.requisitionId,
                                    partnerId:
                                      acceptRejectRequisition[0]?.partnerId,
                                  },
                                });
                              }}
                              color="inherit"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                gap: 2,
                                lineHeight: "10px",
                              }}
                            >
                              <IconWrapper
                                fontSize="small"
                                icon="plus-symbol"
                                color="primary"
                              />
                              Add Candidate
                            </Button>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              size="small"
                              onClick={() => {
                                setIsIsTrash(idx);
                              }}
                              color="inherit"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                gap: 2,
                                lineHeight: "10px",
                              }}
                            >
                              <IconWrapper
                                fontSize="small"
                                icon="delete"
                                color="primary"
                              />
                              Move to Trash
                            </Button>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {isQROpen && (
        <CustomDrawer
          isDrawerOpen={isQROpen}
          handleClose={() => {
            setIsQROpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsQROpen(false)}
              title={`QR Code for ${clickedReq?.jobTitle}  for ${clickedReq?.client?.clientName}`}
            />
            <RequisitionQRDrawer requisition={clickedReq} />
          </Box>
        </CustomDrawer>
      )}
      {length > 3 && (
        <Box
          mt={2}
          justifyContent={"center"}
          display={"flex"}
          bgcolor={theme.palette.bgLightGray.main}
          width="100%"
          position="sticky"
          bottom="0px"
          p={3}
        >
          <Pagination
            count={count}
            size="small"
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-icon": {
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                height: "35px",
                minWidth: "35px",
                color: theme.palette.bgWhite.main,
                fontSize: "14px",
              },
              "& .mui-1ba2zw7-MuiButtonBase-root-MuiPaginationItem-root": {
                padding: "14px 10px 13px 10px",
                borderRadius: "50%",
                height: "20px",
                minWidth: "10px",
              },
              "& .mui-rbegq8-MuiPagination-root .MuiPaginationItem-icon": {
                fontSize: "54px",
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

type SourcingStagesProps = {
  stage: string;
  count: string;
  color: string;
  fontWeight?: number;
  marginBottom?: number;
  noBg?: boolean;
};

const SourcingStages = ({
  stage,
  count,
  color,
  fontWeight,
  marginBottom,
  noBg,
}: SourcingStagesProps) => {
  return (
    <Grid item alignSelf={"center"} md={2} xs={3} lg={2} sm={2}>
      <Stack direction={"column"} display={"flex"} spacing={1}>
        <Box display={"flex"} justifyContent={"center"} height={20}>
          <Typography
            variant="caption"
            color="textSecondary"
            display={"flex"}
            textAlign={"center"}
            fontSize={"10px"}
            lineHeight={1}
            // marginBottom={marginBottom}
          >
            {stage}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: (theme) =>
              noBg ? null : theme.palette.bgLightGray.main,
            padding: "5px 15px 4px 15px",
            textAlign: "center",
            borderRadius: "2px",
            width: "auto",
          }}
        >
          <Typography
            variant="caption"
            color={color}
            textAlign={"center"}
            fontWeight={fontWeight}
          >
            {count}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};
