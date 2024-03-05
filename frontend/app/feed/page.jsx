"use client";
import AuthForm from "@/components/auth";
import Post from "@/components/Feed/post";
import MainLayout from "@/layouts/main";
import { useState } from "react";
import CreatePost from "@/components/Feed/createPost";
import { useSelector } from "react-redux";

export default function Home() {
  const [showAuthForm, SetShowAuthForm] = useState(false);

  const posts = useSelector((state) => state.posts.recents.posts) || [];

  return (
    <>
      <AuthForm
        isModalOpen={showAuthForm}
        closeModal={() => SetShowAuthForm(false)}
      />
      <MainLayout>
        <CreatePost />
        <section aria-label="Feed Posts">
          {posts.map((post, i) => (
            <Post {...post} feedType="recents" />
          ))}
        </section>
      </MainLayout>
    </>
  );
}
