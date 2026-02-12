import type { ComponentProps } from "react";

import { LogOut, User } from "lucide-react";

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

export function UserButton({
  variant = "ghost",
  size = "icon",
  className,
  ...props
}: ComponentProps<typeof Button>) {
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
            <UserAvatar />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
