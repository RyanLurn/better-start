import { type ComponentProps, useState } from "react";
import { LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import type { User } from "@/features/user/types";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/user/components/avatar";
import { authClient } from "@/features/auth/client";
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
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    const { error, data } = await authClient.signOut();

    if (data?.success) {
      await router.invalidate();
      toast.success("Signed out successfully.");
    } else {
      toast.error(error?.message ?? "Failed to sign out.");
    }
    setIsSigningOut(false);
  }

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
        <DropdownMenuItem disabled={isSigningOut}>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => void signOut()}
          disabled={isSigningOut}
          variant="destructive"
        >
          <LogOutIcon />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
