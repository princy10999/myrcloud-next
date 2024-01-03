import React from "react";
import Link from "@mui/material/Link";
import { Grid, Box, Stack, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CommonComponentProps from "@customTypes/commonComponentProps";

type BreadCrumbType = CommonComponentProps & {
  name?: string;
  href?: string;
};

export default function BreadCrumbs({ item }: any) {
  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ backgroundColor: "white", width: "100%" }}>
          <Grid container>
            {/* <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="none" key="1">
                Client
              </Link>
              <Link
                underline="none"
                key="1"
                href={href}
              >
                {text}
              </Link>
            </Breadcrumbs> */}

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumbs"
            >
              {/* {item.map(({ breadCrumbItem, index }:any) => (
                
              ))}
               */}
              {item.map((breadcrumbItem: BreadCrumbType, index: any) => {
                return (
                  <Link
                    // onClick={(event) => event.preventDefault()}
                    key={index}
                    underline="none"
                    color="primary"
                    fontSize="14px"
                    href={breadcrumbItem.href}
                  >
                    {breadcrumbItem.name}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
