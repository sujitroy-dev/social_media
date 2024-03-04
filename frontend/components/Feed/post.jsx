import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import Image from "next/image";
import {
  Avatar,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import NameAvatar from "../NameAvatar";

export default function Post({
  id: postID,
  name,
  username,
  profile_pic,
  content,
  assetsArr,
  isLiked = false,
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Card className="p-8 shadow-sm border-x border-t border-gray-200 rounded-none">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          {profile_pic ? (
            <Avatar src={profile_pic} alt="avatar" size="md" />
          ) : (
            <NameAvatar name={name} rounded="full" />
          )}
          <div className="flex flex-col align-items flex-1 overflow-x-hidden">
            <span className="font-semibold truncate">{name}</span>
            <span className="font-normal text-sm text-gray-600 truncate">
              @{username}
            </span>
          </div>
        </div>
        <div className="w-44">
          <Tooltip content="More">
            <IconButton
              variant="text"
              color="gray"
              className="rounded-full relative select-none ml-auto block"
              data-ripple-light="true"
              data-popover-target="menu"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </IconButton>
          </Tooltip>
          {showMenu && (
            <ul
              role="menu"
              data-popover="menu"
              data-popover-placement="bottom"
              class="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
            >
              <li
                role="menuitem"
                class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Edit
              </li>
              <li
                role="menuitem"
                class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Archive
              </li>
              <li
                role="menuitem"
                class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>
      <Typography className="font-normal mb-4">{content}</Typography>
      <div className="mb-4">
        <Swiper className="mySwiper" navigation={false} modules={[Navigation]}>
          {assetsArr.map((elm) => (
            <SwiperSlide>
              <Image
                src={elm.url}
                key={elm.id}
                width={600}
                height={384}
                loading="lazy"
                className="w-full h-96 object-contain rounded-md cursor-grab"
                onDoubleClick={() =>
                  console.log("double clicked on post: ", postID)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content="Like">
          <IconButton variant="text" className="rounded-full" color="red">
            {isLiked ? (
              <HeartIcon width={28} className="" color="#4b4b4b" />
            ) : (
              <HeartIconFill width={28} color="red" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip content="Comment">
          <IconButton variant="text" className="rounded-full">
            <ChatBubbleOvalLeftEllipsisIcon width={28} color="#4b4b4b" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Share">
          <IconButton variant="text" className="rounded-full" color="blue">
            <ShareIcon width={24} color="#4b4b4b" />
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
}
