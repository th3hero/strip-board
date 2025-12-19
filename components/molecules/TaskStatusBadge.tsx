'use client';

import { Badge } from '../ui/badge';
import { Circle, CheckCircle2, AlertCircle, XCircle, Pause } from 'lucide-react';
import { TaskStatus } from '../../types';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig = {
  todo: {
    label: 'Todo',
    icon: Circle,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  'in-progress': {
    label: 'In Progress',
    icon: AlertCircle,
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  paused: {
    label: 'Paused',
    icon: Pause,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  done: {
    label: 'Done',
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  blocked: {
    label: 'Blocked',
    icon: XCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}

