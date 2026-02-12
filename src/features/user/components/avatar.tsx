import type { ComponentProps } from "react";

import type { User } from "@/features/user/types";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

interface UserAvatarProps
  extends ComponentProps<typeof Avatar>, Pick<User, "image" | "name"> {}

export function UserAvatar({ image, name, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage alt={`${name}'s profile picture`} src={image || undefined} />
      <AvatarFallback>{name.toUpperCase().slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
