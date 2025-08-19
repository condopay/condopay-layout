import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.avatar} alt="User Avatar" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className="text-sm font-semibold">{user.name}</h1>
    </div>
  );
}
