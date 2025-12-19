'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DragHandle } from '../molecules/DragHandle';
import { PriorityIndicator } from '../molecules/PriorityIndicator';
import { TaskStatusBadge } from '../molecules/TaskStatusBadge';
import { CommentHistory } from '../molecules/CommentHistory';
import { MoreVertical, Trash2, Check, Play, Square, Pause, Clock, Edit } from 'lucide-react';
import { Task, TaskStatus } from '../../types';
import { calculateTimeSpent, formatTimeSpent } from '../../lib/time-utils';

interface TaskStripProps {
  task: Task;
  index: number;
  totalTasks: number;
  isHighest: boolean;
  onStatusChange: (status: TaskStatus) => void;
  onDelete: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onEdit?: () => void;
}

export function TaskStrip({
  task,
  index,
  totalTasks,
  isHighest,
  onStatusChange,
  onDelete,
  onPause,
  onResume,
  onEdit,
}: TaskStripProps) {
  const timeSpent = calculateTimeSpent(task.comments || [], task.status);
  const isInProgress = task.status === 'in-progress';
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const quickActions = [
    {
      status: 'in-progress' as TaskStatus,
      icon: Play,
      label: 'In Progress',
      hidden: task.status === 'in-progress',
    },
    {
      status: 'done' as TaskStatus,
      icon: Check,
      label: 'Done',
      hidden: task.status === 'done',
    },
    {
      status: 'blocked' as TaskStatus,
      icon: Square,
      label: 'Blocked',
      hidden: task.status === 'blocked',
    },
  ];

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`p-4 transition-all ${
          isHighest
            ? 'border-2 border-orange-500 shadow-lg shadow-orange-100'
            : 'border border-gray-200 hover:shadow-md'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <DragHandle listeners={listeners} attributes={attributes} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <PriorityIndicator
                index={index}
                totalTasks={totalTasks}
                isHighest={isHighest}
              />
              <div className="flex items-center gap-1">
                {/* Pause/Resume Button for In-Progress Tasks */}
                {isInProgress && onPause && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-yellow-600 hover:bg-yellow-50"
                    onClick={onPause}
                    title="Pause Task"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                
                {quickActions.filter(a => !a.hidden).map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.status}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onStatusChange(action.status)}
                      title={action.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  );
                })}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={onEdit}
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={onDelete}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Time Spent Display */}
            {timeSpent > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <Clock className="w-3 h-3" />
                <span>{formatTimeSpent(timeSpent)}</span>
              </div>
            )}

            {/* Title */}
            <h3 className={`text-lg font-semibold mb-2 ${isHighest ? 'text-orange-600' : ''}`}>
              {task.title}
            </h3>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center gap-2 flex-wrap">
              <TaskStatusBadge status={task.status} />
              {task.labels?.map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
            
            {/* Comment History */}
            {task.comments && task.comments.length > 0 && (
              <CommentHistory comments={task.comments} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

