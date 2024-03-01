import React from "react";

export default function NameAvatar({ name = "", size = "md", rounded = "md" }) {
  const nameWordArr = name.split(" ");
  let nameCharArr = nameWordArr.map((word) => word.split("")?.[0]);
  nameCharArr = nameCharArr.slice(0, 2);

  return (
    <div
      className={`bg-purple-400 text-white uppercase rounded-${rounded} ${size === "sm" ? "w-10 h-10 flex items-center justify-center gap-0.5 font-normal text-xl" : size === "lg" ? "w-14 h-14 flex gap-0.5 items-center justify-center font-semibold text-2xl" : "w-12 h-12 flex gap-0.5 items-center justify-center font-semibold text-2xl"}`}
    >
      {nameCharArr.map((elm) => (
        <span>{elm}</span>
      ))}
    </div>
  );
}
