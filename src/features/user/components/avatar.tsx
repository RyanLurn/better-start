import type { ComponentProps } from "react";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { authClient } from "@/features/auth/client";
import { Spinner } from "@/components/ui/spinner";

export function UserAvatar({ ...props }: ComponentProps<typeof Avatar>) {
  const { data } = authClient.useSession();

  if (!data) {
    return (
      <Avatar {...props}>
        <Spinner />
      </Avatar>
    );
  }

  return (
    <Avatar {...props}>
      <AvatarImage
        src={data.user.image || undefined}
        alt={`${data.user.name}'s avatar`}
      />
      <AvatarFallback>{data.user.name}</AvatarFallback>
    </Avatar>
  );
}
