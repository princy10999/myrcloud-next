// import React from "react";
// import PaperContainer from "@components/common/paperContainer";
// import FullPageLayout from "@components/Layout/FullPageLayout";
// import StandardLayout from "@components/Layout/StandardLayout";
// import dynamic from "next/dynamic";

// import { Typography, Box, Grid, Skeleton } from "@mui/material";

// import { PowerBIEmbed } from "powerbi-client-react";

// import { models } from "powerbi-client";

// export default function CustomReports({ menuCode }: any) {
//   const reportId = "38b6e2f6-9cf5-405a-8269-73144e083c60";
//   const embedUrl =
//     "https://app.powerbi.com/reportEmbed?reportId=38b6e2f6-9cf5-405a-8269-73144e083c60&groupId=26319c81-989a-4e25-8785-1d899da8be45&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwUXVlcnlEYXRhU2FhU0VtYmVkIjp0cnVlLCJza2lwUXVlcnlEYXRhUGFhU0VtYmVkIjp0cnVlLCJza2lwUXVlcnlEYXRhRXhwb3J0VG8iOnRydWV9fQ%3d%3d";
//   const token =
//     "H4sIAAAAAAAEAB3UxxKrSBYE0H95WyYCK8xE9AIPQkhQeHZ4QeGNStAx_z7q3ufq3Mz79x8nO_spK__8908iortHJrraIOEMpUSAkX7ccSLB58ejaLovfWs_CyfPaj-lBWoEI4FkaRynVt-J00m7NmDO_Wg63A5uyvoZKytRkZOCfTcS7mZg0LvAAPo-5Y_cg8HoMUQ-a04wJTOFLByYfn-IturNk640Y7TMGHlkArVHs3C7Spb3Rex1mDStfgTcystRhryeOmvTfUp-zwFjCi6RkImN3LOKsbuock4oVwhk-6nxOhbnEekw7XAtS30GU69c6g5z9RzEnEAS5wdjWz4w9K0oPOSAED8ChQlaeeK9nfXrS1Rlp5YHVjkRagPq6uwhRoESrxUDQZ-nASDyyn2VLriTL7GoaTDdREWCjXFnLRDBqTdH4uLIWiRu7FdRUhXpdXXb7oASh1fTPvMSphZOhPsCmo3S2tRQCTOfiJJcV9f6HMaWuEgVWVpzve7jDt04mLgPjcVlTH5RBGFwZ4XNGF8OZp7Xue_9SJstG8T6O33ah_DBRm3M8kQPtGi6Kyyx1aHPqF0zchFk3yMEJP_MfFDEJQ30XRMZcflKITyKDH_a18iUDxN_UG6UMurSdm_DHkczuAQrbCyh3Hr9jTx64t2Rf-aqC7KlfOeUOogtx6gWn2pX44gERFdWkHydgOVqDxD7pPeMUyj7UlSpxjQo3-YL4FbPeKINOArZTceH1uJxLKPK_hVMuUK9qqc7oIt7mFYxZRfHAHhn8eARqRG5RrapcTyZSHSE-MQ6CzDgnwrz9U_oKKqLk-Ao6Ko2XXrpWz6M3yrNYa4QT-WZ97YeKX1Faq98cBvDKCilxm9QGuxLsUbMp1ncRF2DXs095KMUK8-7FMlEr9qmk8t__vNHXs95n6zq_M3JPSwo0NVROzPdTi8-FL5N_ZxEG-Vd3RcdTAzciD507NNbmzPMCFdo2-dEBl0fvJY6FG3np3ObDRScjBlUWd2r2LzRUr1R9XPrEs0qI2v59vnGPCnjcworSrjNLIejPnbhZXshc-JaaPnmTXnzF58b7x4L34YX9GOYBg6Tk2yl0cl3SjatFY1dvUy09NLvamRX2qBi7zvvn6ddlocBQGPPuf6xB3nJGZFzTp_Nf3UjU_MzG96T9TMBNz61zjvGDK0JCjfRCMyBmOLLDdSulCWzODszJiC9fLSXqfA6vjsLyV3JQkRYz-iXLivvKFB6uDysi1OAWhs1j0RFeXAoEFt9cZu__vqH-Zzf1WqGP-WXiCzjsBaJstNr49c-8n0M_Zvy2mbM9mOtfjEY4WemhhcPbitjTEISZd8bIAw2aJqNzsjhTdAQrPVESEkXXsckQ1LA1WSafc3Wh05JzeZRiLD1xu4t4u1ykOf9rb0GukTZyph7zdOhzdqZQjnWbNjfWJ5rMR3fXdH1V69JFliLX09is68VkoKcIAODvUldgkYqzXyZkLjv9vtxsRSeH2094EPqBuSTx9jnFRxQfLMlCj2FvYrX3VdvHmE9-Z-LZD9fqgziEjvHQO8FiBYfJjlJthxGf6_qLtSGp-rFcppNV4Houi-0Si5Xgp5u3dhMagepBmYx65dINIlG3GIj9kvPzItVtpX8Kjrt1Yk5Ol5iuuuUrjCYGD99-e3F4o_5f_8HTIUm2EIGAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTY2Nzg4NzgyMn0=";

//   return (
//     <StandardLayout title="Reports" menuCode={menuCode}>
//       <PaperContainer>
//         <PowerBIEmbed
//           embedConfig={{
//             type: "report", // Supported types: report, dashboard, tile, visual and qna
//             id: reportId,
//             embedUrl: embedUrl,
//             accessToken: token,
//             tokenType: models.TokenType.Embed,
//             //pageName: "ReportSection1",
//             //permissions:models.Permissions.All,
//             //viewMode:models.ViewMode.View,
//             settings: {
//               bars: {
//                 actionBar: {
//                   visible: true,
//                 },
//               },
//               panes: {
//                 filters: {
//                   visible: true,
//                 },
//                 pageNavigation: {
//                   visible: true,
//                   position: models.PageNavigationPosition.Left,
//                 },
//               },
//               background: models.BackgroundType.Transparent,
//               //layoutType: null,
//             },
//           }}
//           eventHandlers={
//             new Map([
//               [
//                 "loaded",
//                 function (event, report) {
//                   //console.log("Report loaded", report);
//                   //   if (!props.fullMode) {
//                   //     report.getPages().then(function (pages) {
//                   //       pages[0].setActive();
//                   //     });
//                   //   }
//                   //props.setLoading(false);
//                 },
//               ],
//               [
//                 "rendered",
//                 function () {
//                   //console.log("Report rendered");
//                 },
//               ],
//               [
//                 "error",
//                 function (event: any) {
//                   console.log(event?.detail);
//                   //props.setLoading(false);
//                 },
//               ],
//             ])
//           }
//           cssClassName={`report-style-class`}
//         />
//       </PaperContainer>
//     </StandardLayout>
//   );
// }


import { Box } from '@mui/material'
import React from 'react'

export default function CustomReports({ menuCode }: any) {
  return (
    <Box>customReports</Box>
  )
}
