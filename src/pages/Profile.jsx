import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import '../App.css'
import AdminNav from '../components/AdminNav'
import SideBar from '../components/SideBar'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)

  if (!user) return (
    <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
      <div className='z-100 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
        <AdminNav />
        <div className='flex flex-1 overflow-y-auto h-full'>
          <SideBar />
          <div className='flex-1 p-4 sm:px-8 py-4'>
            <div className="p-6 text-white max-w-md mx-auto">No user logged in.</div>
          </div>
        </div>
      </div>
    </div>
  )

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
      <div className='z-100 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
        <AdminNav />
        <div className='flex flex-1 overflow-y-auto h-full'>
          <SideBar />
          <div className='flex-1 p-4 sm:px-8 py-4'>
            <div className="p-6 text-white max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm opacity-75">ID: {user.id}</p>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 rounded">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
