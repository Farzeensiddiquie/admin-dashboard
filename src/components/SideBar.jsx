import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Logo from '../assets/logo.png';
const icons = [
  { id: 1, icon: <FolderIcon />, title: "All Folders" },
  { id: 3, icon: <CreateNewFolderIcon />, title: "New Folder" },
  ];
const SideBar = () => {
  return (
    <div className='w-[60px] sticky flex flex-col items-center space-y-6 py-20 h-[500px] rounded-r-full left-0 top-[10vh] bg-[#45454559]'>
        {/* Logo */}
      <div className="w-9 h-9 overflow-hidden flex items-center justify-center">
        <img src={Logo} alt="logo" />
      </div>

      {/* Sidebar Icons */}
      <div className="flex flex-col items-center space-y-6 mt-6">
        {icons.map((item) => (
          <button
            key={item.id}
            className="text-gray-400 hover:text-white transition-colors"
            title={item.title}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
export default SideBar
