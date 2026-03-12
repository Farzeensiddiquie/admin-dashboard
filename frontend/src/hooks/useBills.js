import { useContext } from 'react';
import { TaskContext } from '../context/BillContext';

export function useBills() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useBills must be used within a TaskProvider');
  }
  return context;
}
