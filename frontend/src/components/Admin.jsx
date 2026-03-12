import '../App.css' 
import AdminNav from './AdminNav'
import AmountCard from './AmountCard'
import Chart from './Chart'
import DashboardCards from './DashBoardCards'
import TasksList from './BillsList'
import SideBar from './SideBar'

export default function Admin() {
  return (
    <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
      <div className='z-100 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
        <AdminNav />
        <div className='flex flex-1 overflow-y-auto h-full'>
          <SideBar />
          <div className='flex-1 p-4 sm:px-8 py-4'>
            <p className='text-white text-3xl font-bold mb-7'>Dashboard Overview</p>
            <DashboardCards />
            
            <p className='text-white text-3xl font-bold mt-10 mb-7'>Tasks Management</p>
            <TasksList/>
            
            <div className='mt-10 space-y-4'>
              <p className='text-white text-xl font-bold'>Analytics</p>
              <div className='sm:flex flex-1 items-center gap-7'>
                <AmountCard/>
                <Chart/>
              </div>
            </div>
           
          </div>
          </div>
      </div>
    </div>
  )
}
