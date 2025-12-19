'use client';

import { TaskComment } from '../../types';
import { MessageSquare, AlertTriangle, FileText, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface CommentHistoryProps {
  comments: TaskComment[];
}

const commentTypeConfig: Record<string, { icon: any; label: string; className: string }> = {
  deprioritized: {
    icon: AlertTriangle,
    label: 'Deprioritized',
    className: 'text-orange-600',
  },
  blocked: {
    icon: AlertTriangle,
    label: 'Blocked',
    className: 'text-red-600',
  },
  note: {
    icon: FileText,
    label: 'Note',
    className: 'text-blue-600',
  },
  started: {
    icon: Play,
    label: 'Started',
    className: 'text-green-600',
  },
  paused: {
    icon: Pause,
    label: 'Paused',
    className: 'text-yellow-600',
  },
  resumed: {
    icon: RotateCcw,
    label: 'Resumed',
    className: 'text-green-600',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className: 'text-green-600',
  },
};

export function CommentHistory({ comments }: CommentHistoryProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          History ({comments.length})
        </span>
      </div>
      <div className="space-y-2">
        {comments.map((comment, index) => {
          const config = commentTypeConfig[comment.type];
          const Icon = config.icon;
          const date = new Date(comment.createdAt);

          return (
            <div
              key={index}
              className="text-sm bg-gray-50 rounded-md p-3 space-y-1"
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-3 h-3 ${config.className}`} />
                <Badge variant="outline" className="text-xs">
                  {config.label}
                </Badge>
                <span className="text-xs text-gray-500">
                  {date.toLocaleDateString()} at {date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

