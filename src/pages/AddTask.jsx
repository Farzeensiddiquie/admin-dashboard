import '../App.css' 
import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import SideBar from '../components/SideBar'
import AddTaskModal from '../components/modals/AddBillModal'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { TaskContext } from '../context/BillContext'

export default function AddTask() {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskData) => {
    const newTask = addTask(taskData);
    console.log('Task added:', newTask);
    setIsModalOpen(false);
    navigate('/tasks');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
        <div className='z-50 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
          <AdminNav />
          <div className='flex flex-1 overflow-y-auto h-full'>
            <SideBar />
            <div className='flex-1 p-4 sm:px-8 py-4 flex flex-col'>
              <p className='text-white text-3xl font-bold mb-10'>Add New Task</p>
              <div className='flex items-center justify-center flex-1'>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-lg'
                >
                  Add Task +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAddTask}
        />
      )}
    </>
  )
}
