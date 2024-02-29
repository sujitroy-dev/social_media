import { PhotoIcon } from "@heroicons/react/24/outline";
import { Avatar, Button } from "@material-tailwind/react";
import React, { useState } from "react";

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
        className={`p-2 rounded-md bg-white mb-4 border ${isInputFocus ? "border-gray-500 shadow-sm" : "border-gray-300"} flex gap-2`}
      >
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="md"
          variant="rounded"
        />

        <textarea
          class="block w-full text-base resize-none focus:outline-none  no-scrollbar flex-1"
          placeholder="Type something..."
          onChange={handleTextChange}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        >
          {text}
        </textarea>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <PhotoIcon color="black" width={25} height={25} />
        </div>
        <Button className="rounded-full">Send</Button>
      </div>
    </section>
  );
}
