import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 'user-1',
    name: 'Farzeen Siddiqui',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
