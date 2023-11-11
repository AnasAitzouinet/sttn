import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Map,
  MapPin
} from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface DropdownMenuDemoProps {
  children: React.ReactNode;
  username: string;
}
export function DropdownMenuProfile({ children , username}: DropdownMenuDemoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl">
        <DropdownMenuLabel className="capitalize">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MapPin className="mr-2 h-4 w-4" />
            <span>My Trips</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Map className="mr-2 h-4 w-4" />
            <span>My Activities</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
