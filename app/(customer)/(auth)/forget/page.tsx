"use client"
import React, { useState } from 'react'
import ForgetForm from './ForgetForm';
import VerificationForm from './VerificationForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const FORM_STATES = {
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  VERIFICATION: "VERIFICATION",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
};

export default function ResetPassword() {
  const [formState, setFormState] = useState(FORM_STATES.FORGOT_PASSWORD);
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  function navigateToUpdatePasswordForm() {
    setFormState(FORM_STATES.UPDATE_PASSWORD);
  }

  function navigateToVerificationForm() {
    setFormState(FORM_STATES.VERIFICATION);
  }

  return (
    <>
      {formState === FORM_STATES.FORGOT_PASSWORD && (
        <ForgetForm
          onEmailSubmit={(email: string) => {
            setEmail(email);
            navigateToVerificationForm();
          }}
        />
      )}
      {formState === FORM_STATES.VERIFICATION && (
        <VerificationForm
          email={email}
          onCodeSubmit={(code: string) => {
            setVerifyCode(code);
            navigateToUpdatePasswordForm();
          }}
        />
      )}
      {formState === FORM_STATES.UPDATE_PASSWORD && (
        <UpdatePasswordForm email={email} verifyCode={verifyCode} />
      )}
    </>
  );
}