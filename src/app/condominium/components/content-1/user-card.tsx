import Image from "next/image";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={28}
        height={28}
        className="rounded-full"
      />
      <h1 className="text-sm font-semibold">{user.name}</h1>
    </div>
  );
}
