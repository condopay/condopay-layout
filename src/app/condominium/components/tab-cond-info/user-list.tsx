import { UserPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { User } from "../../../../../generated/prisma";
import { UserCard } from "./user-card";

interface UserListProps {
  className?: string;
  title: string;
  users: (Partial<User> & { id: string })[];
}

export default async function UserList({
  className,
  title,
  users,
}: UserListProps) {
  return (
    <>
      <div
        className={cn(
          "mx-auto w-full max-w-xl",
          "bg-white dark:bg-zinc-900/70",
          "border border-zinc-100 dark:border-zinc-800",
          "space-y-2 rounded-xl p-3 shadow-sm backdrop-blur-xl",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-sm text-zinc-500">{title}</h1>
          <Button variant="outline" size="icon" className="border-none">
            <UserPlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}
