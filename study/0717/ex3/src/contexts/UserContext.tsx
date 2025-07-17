import { createContext, useContext, useState } from "react";

export type User = {
  name: string;
  age: number;
};

const UserContext = createContext<User>({
  name: "",
  age: 0,
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({
    name: "user1",
    age: 20,
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
