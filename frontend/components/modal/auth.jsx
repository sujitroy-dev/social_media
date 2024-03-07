"use client";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import Icon from "../icons";
import { useSelector } from "react-redux";

export default function AuthForm({ closeModal }) {
  const isModalOpen = !useSelector((state) => state.user.loggedIn);

  return (
    <Dialog open={isModalOpen} className="p-3 w-full" handler={closeModal}>
      <div className="w-full flex flex-col items-center justify-center my-5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-3">
            Sign in
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Sign in with provided options.
          </Typography>
        </div>
        <div className="mt-2 mb-2 mx-auto max-w-screen-lg w-2/3">
          <div className="space-y-4 my-4">
            <LoginOptions />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function LoginOptions() {
  return (
    <>
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
