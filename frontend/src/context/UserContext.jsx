import { createContext, useState } from "react";

export const UserContext = createContext();

const getAvatar = (gender) => {
  return gender === "female"
    ? "https://randomuser.me/api/portraits/lego/9.jpg"
    : "https://randomuser.me/api/portraits/lego/5.jpg";
};

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "user-1",
    name: "Farzeen Siddiqui",
    email: "farzeenwasif15@gmail.com",
    gender: "female",
    avatar: getAvatar('female'),
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}