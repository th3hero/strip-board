'use client';

import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../types';
import { TaskStrip } from './TaskStrip';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface ActiveTasksSectionProps {
  tasks: Task[];
  onDragEnd: (event: DragEndEvent) => void;
  onAddClick: () => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onPause: (taskId: string) => void;
  onResume: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function ActiveTasksSection({
  tasks,
  onDragEnd,
  onAddClick,
  onStatusChange,
  onDelete,
  onPause,
  onResume,
  onEdit,
}: ActiveTasksSectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className="flex-1 space-y-4">
      {/* Add Task Button */}
      <div className="sticky top-0 z-10 bg-gray-50 pb-4">
        <Button
          onClick={onAddClick}
          className="w-full bg-orange-500 hover:bg-orange-600"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </Button>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={tasks.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <TaskStrip
                  key={task._id}
                  task={task}
                  index={index}
                  totalTasks={tasks.length}
                  isHighest={index === 0}
                  onStatusChange={(status) => onStatusChange(task._id, status)}
                  onDelete={() => onDelete(task._id)}
                  onPause={() => onPause(task._id)}
                  onResume={() => onResume(task._id)}
                  onEdit={() => onEdit(task)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No active tasks!</h3>
          <p className="text-gray-500">
            Start by adding a task above. Your highest priority task will appear at the top.
          </p>
        </div>
      )}
    </div>
  );
}

