import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonContained from "@components/Layout/ButtonContained";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import Assets from "@components/common/image_container";

export default function Terms_And_Condition({ onClose }: any) {
  const theme = useTheme();
  const [accordianState, setAccordianState] = React.useState({
    1: true,
  });
  return (
    <>
      <Box className="terms_and_condition">
        <Box>
          <Accordion
            expanded={accordianState[1]}
            onChange={() => {
              setAccordianState((t) => ({ ...t, [1]: !t[1] }));
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                1. General Terms and Conditions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"h4"}
                  component={"h6"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"h6"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {` The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`  Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                2. Content from Third Parties
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {` Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {` The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {` We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                3. Links to and from Third Party Sites
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                4. Feedback
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                5. Termination
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                6. Proprietary Materials Agreement
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                7. Disclaimer of Warranties
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                8. Disclaimer Notice
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant={"h5"}
                color={(theme) => theme.palette.bgBlack.main}
                fontWeight={600}
                fontSize={"18px"}
              >
                9. Indemnities
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Welcome to MyRCloud! These terms and conditions outline the
                  rules and regulations for the use of Company Name's Website,
                  located at Website.com. By accessing this website we assume
                  you accept these terms and conditions. Do not continue to use
                  Website Name if you do not agree to take all of the terms and
                  conditions stated on this page.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: “Client”, “You” and “Your” refers to you, the
                  person log on this website and compliant to the Company's
                  terms and conditions. “The Company”, “Ourselves”, “We”, “Our”
                  and “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client's needs in respect of provision of the Company's
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`We employ the use of cookies. By accessing Website Name, you
                  agreed to use cookies in agreement with the Company Name's
                  Privacy Policy.`}
                </Typography>
                <Typography
                  variant={"caption"}
                  component={"p"}
                  color={(theme) => theme.palette.bgBlack.main}
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {`Most interactive websites use cookies to let us retrieve the
                  user's details for each visit. Cookies are used by our website
                  to enable the functionality of certain areas to make it easier
                  for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.`}
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <ButtonOutlined
              borderRadius="24px"
              height="42px"
              width="110px"
              text="Cancel"
              onClick={() => onClose(false)}
            />
            <ButtonContained
              borderRadius="24px"
              height="42px"
              width="110px"
              text="Accept"
              onClick={() => onClose(true)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
