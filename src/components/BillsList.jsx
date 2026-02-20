import { useContext, useState } from 'react';
import { TaskContext } from '../context/BillContext';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import EditTaskModal from './modals/EditBillModal';
import ViewTaskModal from './modals/ViewBillModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import BulkDeleteConfirmModal from './modals/BulkDeleteConfirmModal';

export default function TasksList() {
  const {
    tasks,
    selectedTasks,
    addTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    toggleTaskSelection,
    selectAllTasks,
    clearSelection,
  } = useContext(TaskContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Ready to Assign':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Scheduled':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(selectedTask.id, taskData);
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setSelectedTask(null);
    }
  };

  const handleBulkDelete = () => {
    const totalHours = tasks
      .filter(task => selectedTasks.includes(task.id))
      .reduce((sum, task) => sum + task.hoursLogged, 0);
    
    setIsDeleteModalOpen(false);
    setIsBulkDeleteModalOpen(true);
  };

  const handleConfirmBulkDelete = () => {
    bulkDeleteTasks(selectedTasks);
  };

  const getSelectedTasksData = () => {
    const selected = tasks.filter(task => selectedTasks.includes(task.id));
    const totalHours = selected.reduce((sum, task) => sum + task.hoursLogged, 0);
    return { selected, totalHours };
  };

  const { totalHours } = getSelectedTasksData();

  return (
    <div className="w-full space-y-4">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white">Tasks List</h3>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/50">
            {tasks.length} tasks
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {selectedTasks.length > 0 && (
            <>
              <span className="text-sm text-gray-300">
                {selectedTasks.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/50 rounded-lg text-sm transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border border-gray-500/50 rounded-lg text-sm transition-colors"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tasks Table */}
      {tasks.length === 0 ? (
        <div className="flex items-center justify-center py-12 bg-[#383838]/30 rounded-xl border border-gray-700/30">
          <div className="text-center space-y-2">
            <p className="text-gray-400">No tasks found</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile list (small screens) */}
          <div className="space-y-3 md:hidden">
            {tasks.map((task) => (
              <div key={task.id} className="bg-[#383838]/30 rounded-xl p-3 border border-gray-700/20 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                      className="rounded accent-blue-600 cursor-pointer mt-1"
                    />
                    <div>
                      <p className="text-white font-medium">{task.title}</p>
                      <p className="text-gray-300 text-sm">{task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewClick(task)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <p className="text-blue-400 text-sm ml-2">{task.hoursLogged}/{task.estimatedHours}h</p>
                  <p className="text-gray-300 text-sm ml-2">{formatDate(task.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop / tablet table (md+) */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-700/30">
            <table className="w-full">
            <thead>
              <tr className="bg-[#383838]/50 border-b border-gray-700/30">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTasks.length === tasks.length && tasks.length > 0}
                    onChange={selectAllTasks}
                    className="rounded accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Assignee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Hours</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Due Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-700/20 hover:bg-[#383838]/20 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                      className="rounded accent-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{task.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-300 text-sm">{task.assignee}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-blue-400 text-sm">{task.hoursLogged}/{task.estimatedHours}h</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-300 text-sm">{formatDate(task.dueDate)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewClick(task)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}

      {/* Modals */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdate={handleUpdateTask}
      />

      <ViewTaskModal
        isOpen={isViewModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <BulkDeleteConfirmModal
        isOpen={isBulkDeleteModalOpen}
        count={selectedTasks.length}
        totalHours={totalHours}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
      />
    </div>
  );
}
