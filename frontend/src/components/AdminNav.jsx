import UserNavIcons from './UserNavIcons'
import ReloadButton from './ReloadButton'
const AdminNav = () => {
  return (
    <div className='md:px-30 z-100 px-5 py-1.5   flex justify-between items-center border-b border-[#383838] '>
    <div className='h-15 justify-center flex flex-col    '>
      <div className='flex gap-1 items-center'>
        <h1 className='text-white font-bold text-xl '>Dashboard</h1>
        <ReloadButton/>
         </div>
    </div>
    <UserNavIcons/>
    </div>
  )
}

export default AdminNav
