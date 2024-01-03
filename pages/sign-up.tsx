import React from "react";
import { useTheme } from "@mui/material";
import SignUpForm from "@components/auth/signupForm";
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
    <LoginSignupContainer
      line1="Delivering great"
      line2="recruitment outcomes"
      imgSrc="/assets/img/login_bg.gif"
      noHeader
    >
      <SignUpForm />
    </LoginSignupContainer>
  );
}

export const getStaticProps = async ({ locale = "en" }) => ({
  props: {
    pageTitle: "Partner SignUp",
  },
});
