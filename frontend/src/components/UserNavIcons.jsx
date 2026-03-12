import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function UserNavIcons() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const goProfile = () => {
    navigate('/profile')
  }

  return (
    <div onClick={goProfile} className="flex items-center gap-4 cursor-pointer">
      <img
        src={user?.avatar || 'https://randomuser.me/api/portraits/women/68.jpg'}
        alt={user?.name || 'Admin Profile'}
        className="w-9 h-9 rounded-full border-2 border-gray-700 object-cover"
      />
      <p className="text-white font-bold text-lg">{user?.name || 'Admin'}</p>
    </div>
  )
}
