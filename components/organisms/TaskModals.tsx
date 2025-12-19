'use client';

import { Task } from '../../types';
import { AddTaskModal } from '../molecules/AddTaskModal';
import { EditTaskModal } from '../molecules/EditTaskModal';
import { DeprioritizeModal } from '../molecules/DeprioritizeModal';
import { BlockedModal } from '../molecules/BlockedModal';

interface TaskModalsProps {
  // Add Task Modal
  addTaskOpen: boolean;
  onAddTaskOpenChange: (open: boolean) => void;
  onAddTask: (data: { title: string; description?: string }) => void;
  isAdding: boolean;
  
  // Edit Task Modal
  editTaskOpen: boolean;
  editTask: Task | null;
  onEditTaskOpenChange: (open: boolean) => void;
  onEditTaskSave: (data: { title: string; description?: string }) => void;
  isEditing: boolean;
  
  // Deprioritize Modal
  deprioritizeOpen: boolean;
  deprioritizeTaskTitle: string;
  onDeprioritizeConfirm: (reason: string) => void;
  onDeprioritizeCancel: () => void;
  
  // Blocked Modal
  blockedOpen: boolean;
  blockedTaskTitle: string;
  onBlockedConfirm: (reason: string) => void;
  onBlockedCancel: () => void;
}

export function TaskModals({
  addTaskOpen,
  onAddTaskOpenChange,
  onAddTask,
  isAdding,
  editTaskOpen,
  editTask,
  onEditTaskOpenChange,
  onEditTaskSave,
  isEditing,
  deprioritizeOpen,
  deprioritizeTaskTitle,
  onDeprioritizeConfirm,
  onDeprioritizeCancel,
  blockedOpen,
  blockedTaskTitle,
  onBlockedConfirm,
  onBlockedCancel,
}: TaskModalsProps) {
  return (
    <>
      <AddTaskModal
        open={addTaskOpen}
        onOpenChange={onAddTaskOpenChange}
        onAdd={onAddTask}
        isLoading={isAdding}
      />
      
      <EditTaskModal
        open={editTaskOpen}
        task={editTask}
        onOpenChange={onEditTaskOpenChange}
        onSave={onEditTaskSave}
        isLoading={isEditing}
      />
      
      <DeprioritizeModal
        open={deprioritizeOpen}
        taskTitle={deprioritizeTaskTitle}
        onConfirm={onDeprioritizeConfirm}
        onCancel={onDeprioritizeCancel}
      />
      
      <BlockedModal
        open={blockedOpen}
        taskTitle={blockedTaskTitle}
        onConfirm={onBlockedConfirm}
        onCancel={onBlockedCancel}
      />
    </>
  );
}

