"use client";
import Post from "@/components/Feed/post";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

export default function FeedSection({ feedType }) {
  const posts = useSelector((state) => state.posts[feedType]?.posts) || [];

  return (
    <section aria-label="Feed Posts">
      {posts.map((post) => (
        <Post {...post} feedType={feedType} key={post.id} />
      ))}
    </section>
  );
}

FeedSection.propTypes = {
  feedType: PropTypes.oneOf(["recents", "friends", "popular"]).isRequired,
};
