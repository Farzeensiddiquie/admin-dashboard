import { X } from 'lucide-react';

export default function ViewTaskModal({ isOpen, task, onClose }) {
  if (!isOpen || !task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Low':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Ready to Assign':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Scheduled':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const progressPercentage = task.estimatedHours > 0 ? Math.round((task.hoursLogged / task.estimatedHours) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700/30 sticky top-0 bg-[#2A2A2A]">
          <h2 className="text-2xl font-bold text-white">Task Details</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Task Title</p>
            <p className="text-xl font-semibold text-white">{task.title}</p>
          </div>

          {/* Assignee and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Assignee</p>
              <p className="text-white font-medium">{task.assignee}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Category</p>
              <p className="text-white font-medium">{task.category}</p>
            </div>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Priority</p>
              <span className={`inline-block px-3 py-1 rounded-full border font-semibold text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full border font-semibold text-sm ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>

          {/* Hours Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Hours Progress</p>
              <p className="text-sm font-semibold text-blue-300">{progressPercentage}%</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{task.hoursLogged} / {task.estimatedHours} hours</p>
          </div>

          {/* Due Date */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Due Date</p>
            <p className="text-white font-medium">{formatDate(task.dueDate)}</p>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Description</p>
              <p className="text-gray-300 bg-[#383838] p-3 rounded-lg text-sm">{task.description}</p>
            </div>
          )}

          {/* Summary Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-300 font-semibold">Task Summary</p>
            <div className="space-y-1 text-xs text-blue-300">
              <p>• Priority: <span className="font-semibold">{task.priority}</span></p>
              <p>• Progress: <span className="font-semibold">{progressPercentage}% Complete</span></p>
              <p>• Time Estimate: <span className="font-semibold">{task.estimatedHours} hours</span></p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
