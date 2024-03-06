import React from "react";
import {
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  PowerIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function UserActionsPanel() {
  const { data: session } = useSession({});
  return (
    <aside className="w-72 p-8">
      <div className="flex flex-col items-center">
        <Avatar
          src={session?.user.image}
          size="xxl"
          className="mb-3"
          alt=""
          loading="eager"
        />
        <Typography variant="h6">Bogdan Nikitin</Typography>
        <Typography variant="p" color="gray" className="font-medium">
          @bogdannikitin
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Feed
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          Messages
          <ListItemSuffix>
            <Chip
              value="3"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BellIcon className="h-5 w-5" />
          </ListItemPrefix>
          Notifications
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={signOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </aside>
  );
}
