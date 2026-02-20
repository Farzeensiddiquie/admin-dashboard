import { Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, task, onClose, onConfirm }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-red-500/30">
        {/* Icon and Title */}
        <div className="p-6 text-center border-b border-gray-700/30">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50">
              <Trash2 size={32} className="text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Delete Task?</h2>
        </div>

        {/* Message */}
        <div className="px-6 py-4 text-center space-y-2">
          <p className="text-gray-300">
            Are you sure you want to delete <span className="font-semibold text-red-400">{task.title}</span>?
          </p>
          <p className="text-gray-400 text-sm">
            Assigned to: <span className="text-red-400 font-semibold">{task.assignee}</span>
          </p>
          <p className="text-gray-400 text-sm">This action cannot be undone.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 py-4 bg-[#383838]/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
