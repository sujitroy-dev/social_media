import { PhotoIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, IconButton, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import NameAvatar from "../NameAvatar";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <section className="border-x border-t border-gray-200 p-8 bg-gray-50 rounded-t-sm">
      <div
        className={`p-2 rounded-md bg-white mb-4 border-2 ${isInputFocus ? "border-gray-800 shadow-sm" : "border-gray-300"} flex gap-2`}
      >
        {"valid" ? (
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="md"
            variant="rounded"
          />
        ) : (
          <NameAvatar name="sujit roy" rounded="md" />
        )}

        <textarea
          class="block w-full text-base resize-none focus:outline-none no-scrollbar flex-1"
          placeholder="Share something..."
          onChange={handleTextChange}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        >
          {text}
        </textarea>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <Tooltip content="Select Photos" placement="bottom">
            <IconButton variant="text" className="rounded-full">
              <PhotoIcon color="black" width={24} height={24} />
            </IconButton>
          </Tooltip>
        </div>
        <Button className="rounded-full">Post</Button>
      </div>
    </section>
  );
}
