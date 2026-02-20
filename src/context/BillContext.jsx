import { createContext, useState, useCallback, useMemo, useContext } from 'react';
import { UserContext } from './UserContext';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  // global storage of tasks for all users (demo)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      userId: 'user-1',
      title: 'Dashboard UI Design',
      assignee: 'John Doe',
      status: 'Ready to Assign',
      priority: 'High',
      hoursLogged: 4,
      estimatedHours: 8,
      dueDate: '2026-03-15',
      category: 'Design',
      description: 'Create dashboard mockups'
    },
    {
      id: 2,
      userId: 'user-1',
      title: 'API Integration',
      assignee: 'Jane Smith',
      status: 'In Progress',
      priority: 'Medium',
      hoursLogged: 6,
      estimatedHours: 10,
      dueDate: '2026-03-20',
      category: 'Development',
      description: 'Integrate payment API'
    },
    {
      id: 3,
      userId: 'user-2',
      title: 'Bug Fixes',
      assignee: 'Mike Johnson',
      status: 'Completed',
      priority: 'Low',
      hoursLogged: 8,
      estimatedHours: 5,
      dueDate: '2026-02-28',
      category: 'Maintenance',
      description: 'Fix critical bugs'
    },
    {
      id: 4,
      userId: 'user-1',
      title: 'Team Meeting',
      assignee: 'Sarah Lee',
      status: 'Scheduled',
      priority: 'Medium',
      hoursLogged: 0,
      estimatedHours: 1,
      dueDate: '2026-03-01',
      category: 'Meeting',
      description: 'Weekly standup meeting'
    },
  ]);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const { user } = useContext(UserContext);

  // Visible tasks for current user (derived)
  const visibleTasks = useMemo(() => {
    if (!user) return [];
    return tasks.filter(t => t.userId === user.id);
  }, [tasks, user]);

  // Add task (assign to current user if not provided)
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now(),
      userId: taskData.userId || (user ? user.id : 'user-1'),
      ...taskData,
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [user]);

  // Update task
  const updateTask = useCallback((id, taskData) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...taskData } : task))
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
  }, []);

  // Bulk delete
  const bulkDeleteTasks = useCallback((ids) => {
    setTasks(prev => prev.filter(task => !ids.includes(task.id)));
    setSelectedTasks([]);
  }, []);

  // Toggle task selection
  const toggleTaskSelection = useCallback((id) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  }, []);

  // Select all visible tasks
  const selectAllTasks = useCallback(() => {
    if (selectedTasks.length === visibleTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(visibleTasks.map(task => task.id));
    }
  }, [visibleTasks, selectedTasks.length]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedTasks([]);
  }, []);

  // Get task statistics for visible tasks
  const getTaskStats = useCallback(() => {
    const stats = {
      readyToAssign: visibleTasks.filter(t => t.status === 'Ready to Assign').length,
      inProgress: visibleTasks.filter(t => t.status === 'In Progress').length,
      completed: visibleTasks.filter(t => t.status === 'Completed').length,
      scheduled: visibleTasks.filter(t => t.category === 'Meeting').length,
      totalHoursLogged: visibleTasks.reduce((sum, t) => sum + (t.hoursLogged || 0), 0),
    };
    return stats;
  }, [visibleTasks]);

  const value = {
    tasks: visibleTasks,
    selectedTasks,
    addTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    toggleTaskSelection,
    selectAllTasks,
    clearSelection,
    getTaskStats,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
