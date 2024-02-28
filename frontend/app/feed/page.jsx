"use client";
import AuthForm from "@/components/auth";
import MainLayout from "@/layouts/main";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function Home() {
  const [showAuthForm, SetShowAuthForm] = useState(false);

  return (
    <>
      <AuthForm
        isModalOpen={showAuthForm}
        closeModal={() => SetShowAuthForm(false)}
      />
      <MainLayout></MainLayout>
    </>
  );
}
