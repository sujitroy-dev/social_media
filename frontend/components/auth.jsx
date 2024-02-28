import { Button, Dialog, Typography, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Icon from "./icons";

export default function AuthForm({ isModalOpen, closeModal }) {
  const [state, setState] = useState({
    type: "sign_up", // sign_in/sign_up
    sign_up_step: 0,
    sign_in_step: 0,
  });
  const toggleFormType = () => {
    setState({
      ...state,
      type: state.type === "sign_in" ? "sign_up" : "sign_in",
    });
  };

  return (
    <Dialog open={isModalOpen} className="p-3 w-full" handler={closeModal}>
      <div className="w-full flex flex-col items-center justify-center my-5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-3">
            {state.type === "sign_up" ? "Sign up" : "Sign in"}
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            {state.type === "sign_up" ? "Sign up" : "Sign in"} with provided
            options.
          </Typography>
        </div>
        <div className="mt-2 mb-2 mx-auto max-w-screen-lg w-2/3">
          <div className="space-y-4 my-4">
            {state.type === "sign_up" &&
              (state.sign_up_step === 0 ? (
                <LoginOptions state={state} type="sign_up" />
              ) : (
                <RegisterWithEmail state={state} type="sign_up" />
              ))}
            {state.type === "sign_in" &&
              (state.sign_in_step === 0 ? (
                <LoginOptions state={state} type="sign_in" />
              ) : (
                <RegisterWithEmail state={state} type="sign_in" />
              ))}
          </div>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
            onClick={toggleFormType}
          >
            {state.type === "sign_up"
              ? "Already have an account?"
              : "Not registered yet?"}
            <span className="text-gray-900 ml-1">
              {state.type === "sign_up" ? "Sign in" : "Sign up"}
            </span>
          </Typography>
        </div>
      </div>
    </Dialog>
  );
}

function RegisterWithEmail() {
  return (
    <>
      <div className="mb-1 flex flex-col gap-6">
        <label htmlFor="input_email">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Your email
          </Typography>
        </label>
        <Input
          id="input_email"
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      <div className="mb-1 flex flex-col gap-6">
        <label htmlFor="input_password">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Password
          </Typography>
        </label>
        <Input
          id="input_password"
          size="lg"
          type="password"
          placeholder="Enter your password"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center justify-start font-medium"
          >
            I agree the&nbsp;
            <a
              href="#"
              className="font-normal text-black transition-colors hover:text-gray-900 underline"
            >
              Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      /> */}
      <Button className="mt-6" fullWidth>
        Register Now
      </Button>
    </>
  );
}

function LoginOptions() {
  return (
    <>
      <Button
        size="lg"
        color="white"
        className="flex items-center gap-2.5 justify-center shadow-md"
        fullWidth
      >
        <Icon.Email />
        <span>Sign in With Email</span>
      </Button>
      <Button
        size="lg"
        color="white"
        className="flex items-center gap-2 justify-center shadow-md"
        fullWidth
      >
        <Icon.Google />
        <span>Sign in With Google</span>
      </Button>
      <Button
        size="lg"
        color="white"
        className="flex items-center gap-2 justify-center shadow-md"
        fullWidth
      >
        <Icon.Twitter />
        <span>Sign in With Twitter</span>
      </Button>
    </>
  );
}
