export async function getAdmins() {
  const users = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/user.png",
    },
    {
      id: "2",
      name: "Jane Doe",
      avatar: "/user.png",
    },
    {
      id: "3",
      name: "John Smith",
      avatar: "/user.png",
    },
  ];

  return { users };
}
