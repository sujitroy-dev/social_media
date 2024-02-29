"use client";
import AuthForm from "@/components/auth";
import Post from "@/components/post";
import MainLayout from "@/layouts/main";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import posts from "../../data/posts.json";

export default function Home() {
  const [showAuthForm, SetShowAuthForm] = useState(false);

  return (
    <>
      <AuthForm
        isModalOpen={showAuthForm}
        closeModal={() => SetShowAuthForm(false)}
      />
      <MainLayout>
        <div>
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
