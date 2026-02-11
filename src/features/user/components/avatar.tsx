import type { ComponentProps } from "react";

import type { User } from "@/features/user/types";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

interface UserAvatarProps
  extends ComponentProps<typeof Avatar>, Pick<User, "image" | "name"> {}

export function UserAvatar({ image, name, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={image || undefined} alt={`${name}'s avatar`} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
