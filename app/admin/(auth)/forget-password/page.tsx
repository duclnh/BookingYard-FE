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
      <img className='w-full md:w-[55%] md:min-w-[65%] h-auto rounded-md object-fill object-left' src="assets/images/forget-password.png" alt="forget-password" />
      <div className='w-full md:w-[45%] h-auto px-5 py-9'>
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
      </div>
    </>
  );
}