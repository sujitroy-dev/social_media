import { Avatar, Button, Typography } from "@material-tailwind/react";

export default function AdditionalContentPanel() {
  return (
    <aside className="w-72 p-8">
      <Typography variant="h5" className="mb-4">
        Suggestions
      </Typography>
      <div className="flex flex-col gap-4" aria-label="Profile Suggestions">
        <UserCard
          id={1}
          name="Nick"
          username="shelburne"
          profile_pic="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=126&h=75&dpr=2"
        />
        <UserCard
          id={1}
          name="Sujit"
          username="sujitroy"
          profile_pic="https://sujitroy.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdoy9gcs3y%2Fimage%2Fupload%2Fw_100%2Ch_100%2Cc_fill%2Fv1681144363%2Fprofile_csaemb.webp&w=1080&q=75"
        />
        <UserCard
          id={1}
          name="Salena"
          username="salenaaltman"
          profile_pic="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=126&h=75&dpr=2"
        />
      </div>
    </aside>
  );
}

export function UserCard({ id, name, username, profile_pic }) {
  return (
    <div className="flex items-center gap-2 w-full" aria-label="User Card">
      <Avatar src={profile_pic} alt="avatar" size="md" />
      <div className="flex flex-col align-items flex-1 overflow-x-hidden">
        <span className="font-semibold truncate">{name}</span>
        <span className="font-normal text-sm text-gray-600 truncate">
          @{username}
        </span>
      </div>
      <Button
        size="sm"
        className="rounded-full text-xs"
        onClick={() => console.log("Follow user: ", id)}
      >
        Follow
      </Button>
    </div>
  );
}
