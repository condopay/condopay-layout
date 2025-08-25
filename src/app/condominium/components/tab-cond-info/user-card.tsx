import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { User } from "../../../../../generated/prisma";

export function UserCard({ user }: { user: Partial<User> & { id: string } }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.avatar_url ?? ""} alt="User Avatar" />
        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className="text-sm font-semibold">{user.name}</h1>
    </div>
  );
}
