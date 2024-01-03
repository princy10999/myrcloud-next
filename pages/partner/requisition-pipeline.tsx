import StandardLayout from "@components/Layout/StandardLayout";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import React from "react";
import PublishedRequistions from "@components/requisition-pipeline/public-requisitions";
import AcceptedRejectedReq from "@components/requisition-pipeline/acceptedRejectedReq";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomDrawer from "@components/common/CustomDrawer";
import RequisitionFilter from "@components/requisition-pipeline/reqFlter";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";
import {
  getAcceptRequisitionList,
  getPublishedRequisitionForPartner,
  getRejectRequisitionList,
  getDraftRequisitionList,
} from "@redux/Redux/Actions/PartnerRequisition";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import FullPageLayout from "@components/Layout/FullPageLayout";
import RequisitionsList from "@components/requisition-pipeline/requisitionsList";
import usePageLoader from "@redux/hooks/usePageLoader";
import DatePickerCommon from "@components/common/DatePickerCommon";

const useStyles = makeStyles()((theme) => {
  return {
    filter: {
      boxShadow: "none",
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      ".MuiInputBase-input": {
        backgroundColor: "inherit",
        marginRight: "20px !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      "&:click .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      color: "#1BA39C",
      ".MuiSvgIcon-root ": {
        fill: "#1BA39C !important",
      },
    },
    filterBlack: {
      boxShadow: "none",
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      ".MuiInputBase-input": {
        backgroundColor: "inherit",
        marginRight: "20px !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      "&:click .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      color: "#000000",
      fontWeight: 600,
      ".MuiSvgIcon-root ": {
        fill: `#000000 !important`,
      },
    },
    filterGray: {
      boxShadow: "none",
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      ".MuiInputBase-input": {
        backgroundColor: "inherit",
        marginRight: "20px !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      "&:click .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
      color: "#777777",
      fontWeight: 500,
      ".MuiSvgIcon-root ": {
        fill: `#000000 !important`,
      },
      ".mui-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
        {
          textOverflow: "inherit",
        },
    },
    accord: {
      fontSize: "14px",
      fontWeight: 700,
    },
  };
});
const PER_PAGE = 4;
const tabTitle: any = {
  "1": "Published",
  "2": "Accepted",
  "3": "Rejected",
  "4": "Drafted",
  "5": "Trash",
};
export default function RequisitionPipeline({ menuCode }: any) {
  //Hooks
  const dispatch = useDispatch();
  const theme = useTheme();
  const { classes } = useStyles();
  const setFullPageLoader = usePageLoader();

  //State
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [tab, setTab] = React.useState("1");
  const [pageForPublish, setPageForPublish] = React.useState(1);
  const [pageForAccept, setPageForAccept] = React.useState(1);
  const [pageForReject, setPageForReject] = React.useState(1);

  const rejectRequisition = useAppSelector(
    (state: any) =>
      state?.partner?.isGetRejectRequisitionList?.rejectRequisition
  );
  const draftedRequisition = useAppSelector(
    (state: any) =>
      state?.partner?.isGetDraftRequisitionList?.draftedRequisition
  );
  const draftedRequisitionCount = useAppSelector(
    (state: any) => state?.partner?.isGetDraftRequisitionList?.requisitionCount
  );

  const publishedRequisitionForPartner = useAppSelector(
    (state: any) =>
      state?.partner?.isGetPublishedRequisitionForPartner?.publishRequisition
  );
  const publishedRequisitionForPartnerCount = useAppSelector(
    (state: any) =>
      state?.partner?.isGetPublishedRequisitionForPartner
        ?.publishRequisitionCount
  );
  const acceptRequisitionPartnerCount = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAcceptRequisitionList?.acceptRequisitionCount
  );
  const rejectRequisitionPartnerCount = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAcceptRequisitionList?.rejectRequisitionCount
  );

  //Handler
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  const handlePageChange = (e: any, p: any) => {
    setPageForPublish(p);
  };
  const handlePageChangeForAccpet = (e: any, p: any) => {
    setPageForAccept(p);
  };
  const handlePageChangeForReject = (e: any, p: any) => {
    setPageForReject(p);
  };

  const acceptRequisition = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAcceptRequisitionList?.acceptRequisition
  );

  const searchFilter = async (e: any) => {
    const { value } = e?.target;
    if (tab === "1") {
      const body = `?PageIndex=${pageForPublish}&PageSize=${PER_PAGE}&Filter.SearchFilter=${value}`;
      await dispatch(getPublishedRequisitionForPartner(body));
    } else if (tab === "2") {
      const body = `?PageIndex=${pageForAccept}&PageSize=${PER_PAGE}&IsAccepted=${true}&Filter.SearchFilter=${value}`;
      await dispatch(getAcceptRequisitionList(body));
    } else {
      const body = `?PageIndex=${pageForReject}&PageSize=${PER_PAGE}&IsAccepted=${false}&Filter.SearchFilter=${value}`;
      await dispatch(getRejectRequisitionList(body));
    }
  };

  const _getDraftRequisitionList = async () => {
    const body = `?PageIndex=1&PageSize=10`;
    await dispatch(getDraftRequisitionList(body));
  };
  React.useEffect(() => {
    (async () => {
      _getDraftRequisitionList();
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const body2 = `?PageIndex=${pageForPublish}&PageSize=${PER_PAGE}`;
      setFullPageLoader(true);
      await dispatch(getPublishedRequisitionForPartner(body2));
        setFullPageLoader(false);
    })();
  }, [pageForPublish]);
  React.useEffect(() => {
    (async () => {
      const body = `?PageIndex=${pageForReject}&PageSize=${PER_PAGE}&IsAccepted=${false}`;
      setFullPageLoader(true);
      await dispatch(getRejectRequisitionList(body));
        setFullPageLoader(false);
    })();
  }, [pageForReject]);
  React.useEffect(() => {
    (async () => {
      const body = `?PageIndex=${pageForAccept}&PageSize=${PER_PAGE}&IsAccepted=${true}`;
      setFullPageLoader(true);
      await dispatch(getAcceptRequisitionList(body));
        setFullPageLoader(false);
    })();
  }, [pageForAccept]);

  return (
    <>
      <StandardLayout
        title={(tabTitle[tab] || "") + " Requisitions"}
        menuCode={menuCode || "partner"}
      >
        <FullPageLayout>
          <Box my={2}>
            <Stack
              direction="row"
              spacing={1}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Stack direction="column">
                <Typography fontSize={"22px"} fontWeight={600}>
                  Requisition Pipeline
                </Typography>
                {/* <Typography variant="caption" color={theme.palette.bgGray.main}>
                  Last updated 5 mins ago
                </Typography> */}
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Stack
                  direction={{
                    md: "row",
                    lg: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  spacing={1}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="small"
                      onClick={() => {}}
                      color={"primary"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        fontSize: "14px",
                      }}
                      disabled
                    >
                      <IconWrapper fontSize="small" icon="download" />
                      Download
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setIsFilterOpen(true);
                      }}
                      color={"primary"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        fontSize: "14px",
                      }}
                      // onChange={selectFilter}
                      // disabled
                    >
                      <IconWrapper fontSize="small" icon="filter" />
                      Filter
                    </Button>
                  </Stack>
                  <FormControl size="small">
                    <Select
                      id="demo-select-small"
                      value={age}
                      onChange={handleChange}
                      className={classes.filterBlack}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">Last Month</MenuItem>
                      <MenuItem value={10}>Last Quarter</MenuItem>
                      <MenuItem value={20}>This Year</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                    name="date"
                    id="date"
                    type="date"
                    value={new Date().toLocaleDateString().split("T")[0]}
                    required
                  /> */}
                  <DatePickerCommon />
                  <DatePickerCommon />
                  {/* <TextField
                    id="outlined-size-small"
                    size="small"
                    type={"date"}
                  /> */}
                </Stack>
              </Stack>
            </Stack>
            <Grid
              spacing={1}
              display="flex"
              justifyContent={"space-evenly"}
              flexDirection={"row"}
              md={12}
              sm={12}
              xs={12}
              lg={12}
              mt={1.5}
            >
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={tab}>
                  <Box
                    display={{ lg: "flex" }}
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <TabList
                        onChange={handleChangeTab}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label={`${
                            publishedRequisitionForPartnerCount || 0
                          } - ${tabTitle[1] || ""}`}
                          value="1"
                        />
                        {menuCode == "rcloud" && (
                          <Tab
                            label={`${draftedRequisitionCount || 0} - ${
                              tabTitle[4] || ""
                            }`}
                            value="4"
                          />
                        )}
                        {menuCode !== "rcloud" && (
                          <Tab
                            label={`${acceptRequisitionPartnerCount || 0} - ${
                              tabTitle[2] || ""
                            }`}
                            value="2"
                          />
                        )}
                        {menuCode !== "rcloud" && (
                          <Tab
                            label={`${rejectRequisition?.length || 0} - ${
                              tabTitle[3] || ""
                            }`}
                            value="3"
                          />
                        )}
                        {menuCode !== "rcloud" && (
                          <Tab
                            label={`0 - ${tabTitle[5] || ""}
                          `}
                            value="5"
                          />
                        )}
                      </TabList>
                    </Stack>
                    <Stack
                      direction={{
                        lg: "row",
                        md: "row",
                        xs: "column",
                        sm: "row",
                      }}
                      alignItems={"center"}
                      gap={{ lg: 2, md: 2, xs: 1, sm: 1 }}
                      mt={{ lg: 0, md: 3, xs: 0, sm: 2 }}
                    >
                      <SearchTextFieldComponents
                        placeholder={"Search"}
                        onChange={searchFilter}
                      />
                      <Box flexDirection={"row"} display={"flex"} gap={1}>
                        <Typography
                          variant={"caption"}
                          color={theme.palette.bgGray.main}
                          fontSize={"14px"}
                          mt={1.2}
                          fontWeight={700}
                        >
                          Sort By
                        </Typography>
                        <FormControl size="small">
                          <Select
                            id="CTC"
                            value={age}
                            onChange={handleChange}
                            className={classes.filterGray}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ fontSize: "14px" }}
                            disabled
                          >
                            <MenuItem value="">Salary</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl size="small">
                          <Select
                            id="Priority"
                            value={age}
                            onChange={handleChange}
                            className={classes.filterGray}
                            displayEmpty
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            sx={{ fontSize: "14px" }}
                            disabled
                          >
                            <MenuItem value="">Priority</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        {tab !== "1" && (
                          <FormControl size="small">
                            <Select
                              id="demo-select-small"
                              value={age}
                              onChange={handleChange}
                              className={classes.filterGray}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{ fontSize: "14px" }}
                              disabled
                            >
                              <MenuItem value="">Status</MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                  <TabPanel value="1" sx={{ px: 0 }}>
                    <PublishedRequistions
                      tab={1}
                      publishedRequisitionForPartner={
                        publishedRequisitionForPartner || []
                      }
                      count={publishedRequisitionForPartnerCount}
                      rejectRequisition={[]}
                      page={pageForPublish}
                      handlePageChange={handlePageChange}
                      PER_PAGE={PER_PAGE}
                      length={publishedRequisitionForPartnerCount || 0}
                    />
                  </TabPanel>
                  {menuCode == "rcloud" ? (
                    <TabPanel value="4" sx={{ px: 0 }}>
                      <RequisitionsList
                        tab={4}
                        requisitionList={draftedRequisition}
                        count={draftedRequisitionCount}
                        type={"drafted"}
                      />
                    </TabPanel>
                  ) : (
                    <>
                      <TabPanel value="2" sx={{ px: 0 }}>
                        <AcceptedRejectedReq
                          tab={2}
                          acceptRequisition={acceptRequisition || []}
                          count={acceptRequisitionPartnerCount}
                          page={pageForAccept}
                          handlePageChange={handlePageChangeForAccpet}
                          PER_PAGE={PER_PAGE}
                          length={acceptRequisitionPartnerCount}
                        />
                      </TabPanel>
                      <TabPanel value="3" sx={{ px: 0 }}>
                        <PublishedRequistions
                          tab={3}
                          rejectRequisition={rejectRequisition || []}
                          publishedRequisitionForPartner={[]}
                          count={rejectRequisitionPartnerCount}
                          page={pageForReject}
                          handlePageChange={handlePageChangeForReject}
                          PER_PAGE={PER_PAGE}
                          length={rejectRequisitionPartnerCount || 0}
                        />
                      </TabPanel>
                    </>
                  )}
                </TabContext>
              </Box>
            </Grid>
          </Box>
        </FullPageLayout>
      </StandardLayout>
      {isFilterOpen && (
        <CustomDrawer
          isDrawerOpen={isFilterOpen}
          handleClose={() => {
            setIsFilterOpen(false);
          }}
          anchor="left"
          filter={true}
        >
          <RequisitionFilter setIsFilterOpen={setIsFilterOpen} />
        </CustomDrawer>
      )}
    </>
  );
}
