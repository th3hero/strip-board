import { useState } from 'react';
import { useUpdateTask, useDeleteTask } from './useTasks';
import { Task, TaskStatus } from '../types';

export function useTaskActions() {
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const [blockedModal, setBlockedModal] = useState<{
    open: boolean;
    taskId: string;
    taskTitle: string;
  }>({
    open: false,
    taskId: '',
    taskTitle: '',
  });

  const [editTaskModal, setEditTaskModal] = useState<{
    open: boolean;
    task: Task | null;
  }>({
    open: false,
    task: null,
  });

  const handleStatusChange = (taskId: string, status: TaskStatus, tasks?: Task[]) => {
    const task = tasks?.find(t => t._id === taskId);
    
    // If marking as blocked, show modal for reason
    if (status === 'blocked') {
      setBlockedModal({
        open: true,
        taskId,
        taskTitle: task?.title || '',
      });
      return;
    }
    
    const isStarting = status === 'in-progress' && task?.status !== 'in-progress';
    const isCompleting = status === 'done';
    const wasInProgress = task?.status === 'in-progress';
    
    updateMutation.mutate({ 
      id: taskId, 
      data: { 
        status,
        ...(isStarting && {
          comment: {
            text: 'Started working on task',
            type: 'started',
          }
        }),
        ...(isCompleting && {
          comment: {
            text: wasInProgress ? 'Completed task' : 'Marked as complete',
            type: 'completed',
          }
        })
      } 
    });
  };

  const handlePause = (taskId: string) => {
    updateMutation.mutate({
      id: taskId,
      data: {
        status: 'paused',
        comment: {
          text: 'Paused task',
          type: 'paused',
        },
      },
    });
  };

  const handleResume = (taskId: string) => {
    updateMutation.mutate({
      id: taskId,
      data: {
        status: 'in-progress',
        comment: {
          text: 'Resumed working on task',
          type: 'resumed',
        },
      },
    });
  };

  const handleDelete = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(taskId);
    }
  };

  const handleEdit = (task: Task) => {
    setEditTaskModal({ open: true, task });
  };

  const handleEditSave = (data: { title: string; description?: string }) => {
    if (!editTaskModal.task) return;
    
    updateMutation.mutate({
      id: editTaskModal.task._id,
      data,
    }, {
      onSuccess: () => {
        setEditTaskModal({ open: false, task: null });
      },
    });
  };

  const handleBlockedConfirm = (reason: string) => {
    if (!blockedModal.taskId) return;
    
    updateMutation.mutate({
      id: blockedModal.taskId,
      data: {
        status: 'blocked',
        comment: {
          text: reason,
          type: 'blocked',
        },
      },
    }, {
      onSuccess: () => {
        setBlockedModal({ open: false, taskId: '', taskTitle: '' });
      },
    });
  };

  const handleBlockedCancel = () => {
    setBlockedModal({ open: false, taskId: '', taskTitle: '' });
  };

  return {
    // State
    blockedModal,
    editTaskModal,
    setEditTaskModal,
    // Actions
    handleStatusChange,
    handlePause,
    handleResume,
    handleDelete,
    handleEdit,
    handleEditSave,
    handleBlockedConfirm,
    handleBlockedCancel,
    // Loading states
    isUpdating: updateMutation.isPending,
  };
}

