import "swiper/css";
import "swiper/css/navigation";
import React from "react";
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

export default function Post({ name, username, profile_pic, assetsArr }) {
  return (
    <Card className="p-8">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          <Avatar src={profile_pic} alt="avatar" size="md" />
          <div className="flex flex-col align-items flex-1 overflow-x-hidden">
            <span className="font-semibold truncate">{name}</span>
            <span className="font-normal text-sm text-gray-600 truncate">
              @{username}
            </span>
          </div>
        </div>
        <Tooltip content="More">
          <IconButton variant="text" color="gray" className="rounded-full">
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
      </div>
      <Typography className="font-normal mb-4">
        Hi everyone, today i was on the most beautiful mountain in the world😍,
        I also want to say hi to @jhon !
      </Typography>
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content="Like">
          <IconButton variant="text" className="rounded-full" color="red">
            {true ? (
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
