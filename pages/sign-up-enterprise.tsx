import React from "react";
import { useTheme } from "@mui/material";
import EnterpriseSignupForm from "@components/auth/enterpriseSignupForm";
import LoginSignupContainer from "@components/auth/loginSignupContainer";

export default function Signup() {
  const theme = useTheme();
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.bgWhite.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <LoginSignupContainer
        line1="Best Talent within reach"
        imgSrc2="/assets/img/sign-up-enterprise-bg.png"
        noHeader
        marginTop={8}
        imgSrc2MaxWidth={600}
      >
        <EnterpriseSignupForm />
      </LoginSignupContainer>
    </>
  );
}
