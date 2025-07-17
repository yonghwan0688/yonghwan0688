import { createContext, useState, useContext } from "react";

type User = {
  name: string;
  age: number;
};

const UserContext = createContext({
  name: "",
  age: 0,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: "user1", age: 20 });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function UserProfile() {
  const user = useContext<User>(UserContext);
  return (
    <div>
      <h2>사용자 정보</h2>
      <p>{user.name}</p>
    </div>
  );
}
