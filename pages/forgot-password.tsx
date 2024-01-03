import React from "react";
import LoginSignupContainer from "@components/auth/loginSignupContainer";
import PaperContainer from "@components/common/paperContainer";
import { Typography, Divider, Box } from "@mui/material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonContained from "@components/Layout/ButtonContained";
import { useDispatch } from "react-redux";
import { encryptText } from "@lib/encryptionHelpers";
import {
  resendVerificationLink,
  userLogin,
} from "@redux/Redux/Actions/AuthUser";
import { responseEnum, VerificationType } from "@lib/enum";
import useSnackBar from "@redux/hooks/useSnackBar";
export default function ForgotPassword() {
  return (
    <LoginSignupContainer onlyRightSide>
      <ForgotPasswordForm />
    </LoginSignupContainer>
  );
}

export const ForgotPasswordForm = ({
  verificationType = VerificationType.ForgotPassword,
}: any) => {
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resetLinkSent, setResetLinkSent] = React.useState("");
  const resetPassword = async () => {
    try {
      if (!(email || "").trim()) return;
      setLoading(true);
      const encrypted = encryptText(email);
      const body = {
        syncVal: encrypted.syncVal,
        verificationType: verificationType,
        emailId: encrypted.input,
      };
      const res = await dispatch(resendVerificationLink(body));
      if (res?.payload?.code === responseEnum.SuccessCode) {
        setResetLinkSent(
          "Password reset link sent to your email address. Please reset your password using that link"
        );
      } else {
        setSnackBar("error",res?.payload?.message);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      setResetLinkSent("Something went wrong, please try again later.");
    }
  };
  return (
    <PaperContainer
      elevation={5}
      sx={{ maxWidth: "500px", mt: 20, mx: "auto", textAlign: "left" }}
    >
      <Typography variant="body1" color="initial" fontWeight={"bold"}>
        Reset Your Account Password
      </Typography>
      <Divider sx={{ my: 1 }} />
      {resetLinkSent ? (
        <Typography mb={2} mt={2} variant="subtitle1" color="initial">
          {resetLinkSent}
        </Typography>
      ) : (
        <>
          <Typography mb={2} mt={2} variant="subtitle1" color="initial">
            Please enter your email address to reset your account password.
          </Typography>
          <TextFieldComponent
            type="text"
            placeholder="Please enter email-Id"
            width="100%"
            name="emailId"
            valid
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Box textAlign="right">
            <ButtonContained
              marginTop="32px"
              borderRadius="50px"
              height="35px"
              text="Reset Password"
              loading={loading}
              onClick={resetPassword}
            />
          </Box>
        </>
      )}
    </PaperContainer>
  );
};

export const getStaticProps = async () => ({
  props: {
    pageTitle: "Forgot Password",
  },
});
