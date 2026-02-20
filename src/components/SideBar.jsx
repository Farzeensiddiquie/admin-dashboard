import { Link } from 'react-router-dom';
import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Logo from '../assets/logo.png';

const SideBar = () => {
  return (
    <div className='w-[60px] sticky flex flex-col items-center space-y-6 py-20 h-[500px] rounded-r-full left-0 top-[10vh] bg-[#45454559]'>
        {/* Logo - Link to Home */}
      <Link to="/" className="w-9 h-9 overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity" title="Home">
        <img src={Logo} alt="logo" />
      </Link>

      {/* Sidebar Icons */}
      <div className="flex flex-col items-center space-y-6 mt-6">
        {/* All Tasks */}
        <Link
          to="/tasks"
          className="text-gray-400 hover:text-white transition-colors group relative"
          title="All Tasks"
        >
          <FolderIcon />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            All Tasks
          </span>
        </Link>

        {/* Add Task */}
        <Link
          to="/tasks/add"
          className="text-gray-400 hover:text-white transition-colors group relative"
          title="Add Task"
        >
          <CreateNewFolderIcon />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Add Task
          </span>
        </Link>
      </div>
    </div>
  )
}
export default SideBar


