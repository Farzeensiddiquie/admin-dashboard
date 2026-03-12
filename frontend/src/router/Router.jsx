import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard'
import TasksManagement from '../pages/TasksManagement'
import AddTask from '../pages/AddTask'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/tasks" element={<TasksManagement/>} />
      <Route path="/tasks/add" element={<AddTask/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  )
}
