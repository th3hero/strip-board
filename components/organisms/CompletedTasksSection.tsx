'use client';

import { Task } from '../../types';
import { CompletedTaskAccordion } from '../molecules/CompletedTaskAccordion';

interface CompletedTasksSectionProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export function CompletedTasksSection({ tasks, onDelete }: CompletedTasksSectionProps) {
  return (
    <div className="w-[600px] flex-shrink-0 space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-green-600">✓</span>
            Completed
            <span className="text-sm font-normal text-gray-500">
              ({tasks.length})
            </span>
          </h2>
        </div>
        
        {tasks.length > 0 ? (
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {tasks.map((task) => (
              <CompletedTaskAccordion
                key={task._id}
                task={task}
                onDelete={() => onDelete(task._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-8">
            No completed tasks yet
          </p>
        )}
      </div>
    </div>
  );
}

