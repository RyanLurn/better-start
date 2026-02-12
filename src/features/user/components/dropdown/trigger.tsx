import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/user/components/avatar";
import { Button } from "@/components/ui/button";

export function UserDropdownTrigger() {
  return (
    <DropdownMenuTrigger
      render={
        <Button className="rounded-full" variant="ghost" size="icon">
          <UserAvatar />
        </Button>
      }
    />
  );
}
