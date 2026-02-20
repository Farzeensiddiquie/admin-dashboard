import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import '../App.css'
import AdminNav from '../components/AdminNav'
import SideBar from '../components/SideBar'

export default function Login() {
  const { setUser } = useContext(UserContext)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      id: 'user-' + Date.now(),
      name: name || 'New User',
      avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}`,
    }
    setUser(newUser)
    navigate('/')
  }

  return (
    <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
      <div className='z-100 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
        <AdminNav />
        <div className='flex flex-1 overflow-y-auto h-full'>
          <SideBar />
          <div className='flex-1 p-4 sm:px-8 py-4'>
            <div className="p-6 text-white max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-[#3a3a3a]" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Avatar URL (optional)</label>
                  <input value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full px-3 py-2 rounded bg-[#3a3a3a]" />
                </div>
                <div>
                  <button type="submit" className="px-4 py-2 bg-blue-600 rounded">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
