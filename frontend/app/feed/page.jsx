"use client";
import AuthForm from "@/components/auth";
import Post from "@/components/Feed/post";
import MainLayout from "@/layouts/main";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import postsArr from "../../data/posts.json";
import CreatePost from "@/components/Feed/createPost";

export default function Home() {
  const [showAuthForm, SetShowAuthForm] = useState(false);
  const [posts, setPosts] = useState(postsArr || []);

  return (
    <>
      <AuthForm
        isModalOpen={showAuthForm}
        closeModal={() => SetShowAuthForm(false)}
      />
      <MainLayout>
        <CreatePost />
        <section aria-label="Feed Posts">
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </section>
      </MainLayout>
    </>
  );
}
