import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Steps, Hints, StepsProps, HintsProps } from "intro.js-react";

const PageTour = styled(({ ...props }: StepsProps) => <Steps {...props} />)(
  ({ theme }) => ({})
);
export default PageTour;

export const PageTourHints = styled(({ ...props }: HintsProps) => (
  <Hints {...props} />
))(({ theme }) => ({}));
