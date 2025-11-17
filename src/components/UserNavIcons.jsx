import { User, UserSearch } from "lucide-react";

export default function UserNavIcons() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="https://randomuser.me/api/portraits/women/68.jpg" // replace with actual admin profile image
        alt="Admin Profile"
        className="w-9 h-9 rounded-full border-2 border-gray-700 object-cover cursor-pointer"
      />
      <p className="text-white font-bold text-lg">Farzeen Siddiqui</p>
    </div>
  );
}
