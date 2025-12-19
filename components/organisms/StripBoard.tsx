'use client';

import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { useTasks, useCreateTask, useReorderTasks, useUpdateTask } from '../../hooks/useTasks';
import { useTaskActions } from '../../hooks/useTaskActions';
import { ActiveTasksSection } from './ActiveTasksSection';
import { CompletedTasksSection } from './CompletedTasksSection';
import { TaskModals } from './TaskModals';
import { arrayMove } from '../../lib/utils';
import { Task } from '../../types';
import { Loader2 } from 'lucide-react';

export function StripBoard() {
  const { data: tasks, isLoading, error } = useTasks();
  const createMutation = useCreateTask();
  const reorderMutation = useReorderTasks();
  const updateMutation = useUpdateTask();
  
  const taskActions = useTaskActions();
  
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [deprioritizeModal, setDeprioritizeModal] = useState<{
    open: boolean;
    task: Task | null;
    newOrder: string[];
  }>({
    open: false,
    task: null,
    newOrder: [],
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading tasks. Please refresh the page.</p>
      </div>
    );
  }

  if (!tasks) return null;

  // Filter and sort tasks
  const activeTasks = tasks.filter(t => t.status !== 'done');
  const completedTasks = tasks.filter(t => t.status === 'done');
  
  const sortedActiveTasks = [...activeTasks].sort((a, b) => b.priority - a.priority);
  const sortedCompletedTasks = [...completedTasks].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });

  // Drag and drop handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedActiveTasks.findIndex((t) => t._id === active.id);
    const newIndex = sortedActiveTasks.findIndex((t) => t._id === over.id);

    const reorderedTasks = arrayMove(sortedActiveTasks, oldIndex, newIndex);
    const reorderedIds = reorderedTasks.map((t) => t._id);

    // Check for in-progress task conflict
    const currentInProgressTask = sortedActiveTasks.find(
      (t) => t.status === 'in-progress' && t._id !== active.id
    );
    
    const movingToTop = newIndex === 0;
    
    if (currentInProgressTask && movingToTop) {
      setDeprioritizeModal({
        open: true,
        task: currentInProgressTask,
        newOrder: reorderedIds,
      });
    } else {
      reorderMutation.mutate({ taskIds: reorderedIds });
    }
  };

  // Add task handler
  const handleAddTask = (data: { title: string; description?: string }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setAddTaskModal(false);
      },
    });
  };

  // Deprioritize handlers
  const handleDeprioritizeConfirm = (reason: string) => {
    if (!deprioritizeModal.task) return;
    
    updateMutation.mutate({
      id: deprioritizeModal.task._id,
      data: {
        status: 'paused',
        comment: {
          text: reason,
          type: 'deprioritized',
        },
      },
    }, {
      onSuccess: () => {
        reorderMutation.mutate({ taskIds: deprioritizeModal.newOrder });
        setDeprioritizeModal({ open: false, task: null, newOrder: [] });
      },
    });
  };

  const handleDeprioritizeCancel = () => {
    setDeprioritizeModal({ open: false, task: null, newOrder: [] });
  };

  return (
    <>
      <TaskModals
        addTaskOpen={addTaskModal}
        onAddTaskOpenChange={setAddTaskModal}
        onAddTask={handleAddTask}
        isAdding={createMutation.isPending}
        editTaskOpen={taskActions.editTaskModal.open}
        editTask={taskActions.editTaskModal.task}
        onEditTaskOpenChange={(open) => taskActions.setEditTaskModal({ open, task: null })}
        onEditTaskSave={taskActions.handleEditSave}
        isEditing={taskActions.isUpdating}
        deprioritizeOpen={deprioritizeModal.open}
        deprioritizeTaskTitle={deprioritizeModal.task?.title || ''}
        onDeprioritizeConfirm={handleDeprioritizeConfirm}
        onDeprioritizeCancel={handleDeprioritizeCancel}
        blockedOpen={taskActions.blockedModal.open}
        blockedTaskTitle={taskActions.blockedModal.taskTitle}
        onBlockedConfirm={taskActions.handleBlockedConfirm}
        onBlockedCancel={taskActions.handleBlockedCancel}
      />
      
      <div className="w-full px-6 py-6">
        <div className="flex gap-6 mx-auto">
          <ActiveTasksSection
            tasks={sortedActiveTasks}
            onDragEnd={handleDragEnd}
            onAddClick={() => setAddTaskModal(true)}
            onStatusChange={(taskId, status) => taskActions.handleStatusChange(taskId, status, tasks)}
            onDelete={taskActions.handleDelete}
            onPause={taskActions.handlePause}
            onResume={taskActions.handleResume}
            onEdit={taskActions.handleEdit}
          />
          
          <CompletedTasksSection
            tasks={sortedCompletedTasks}
            onDelete={taskActions.handleDelete}
          />
        </div>
      </div>
    </>
  );
}

