export const tourName = "viewRequisitionTour";
const tourSteps = [
  {
    element: `[data-intro="${tourName}-step1"]`,
    intro: "This field shows the Years of Relevent Experience ctc - Please check the CTC Range.",
  },
  {
    element: `[data-intro="${tourName}-step2"]`,
    intro: "Candidate Gender Preference is Defined for the Candidate.",
  },
  {
    element: `[data-intro="${tourName}-step3"]`,
    intro: "Requisition is open for the particular Location.",
  },
  {
    element: `[data-intro="${tourName}-step4"]`,
    intro: "Please go through the Screening Questioned to be ansered by the Candidate.",
  },
  {
    element: `[data-intro="${tourName}-step5"]`,
    intro: "Important Information is Provided here.",
  },
  {
    element: `[data-intro="${tourName}-step6"]`,
    intro: "Please go through the General Remarks provided by the team for better sourcing.",
  },
];
export default tourSteps;
