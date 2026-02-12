import type { ComponentProps } from "react";

import { LogOutIcon, UserIcon } from "lucide-react";

import type { User } from "@/features/user/types";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/user/components/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserButtonProps extends ComponentProps<typeof Button> {
  userImage: User["image"];
  userName: User["name"];
}

export function UserButton({
  variant = "ghost",
  size = "icon",
  className,
  userImage,
  userName,
  ...props
}: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={cn("rounded-full", className)}
            variant={variant}
            size={size}
            {...props}
          >
            <UserAvatar image={userImage} name={userName} />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
