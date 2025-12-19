'use client';

import { Task } from '../../types';
import { Clock, Trash2, CheckCircle } from 'lucide-react';
import { calculateTimeSpent, formatTimeSpent } from '../../lib/time-utils';
import { CommentHistory } from './CommentHistory';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface CompletedTaskAccordionProps {
  task: Task;
  onDelete: () => void;
}

export function CompletedTaskAccordion({ task, onDelete }: CompletedTaskAccordionProps) {
  const timeSpent = calculateTimeSpent(task.comments || [], task.status);
  const completedDate = new Date(task.completedAt || task.updatedAt);

  return (
    <div className="bg-gray-50 rounded-md border border-gray-200 overflow-hidden relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 bg-gray-50 rounded p-1 hover:bg-gray-100"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={task._id} className="border-b-0">
          <AccordionTrigger className="px-3 py-2 pr-10 hover:no-underline hover:bg-gray-100">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <h4 className="text-sm font-medium text-gray-700 line-through">
                  {task.title}
                </h4>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>{completedDate.toLocaleDateString()}</span>
                {timeSpent > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeSpent(timeSpent)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-3 pb-3">
            {task.description && (
              <div className="mb-3">
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            )}
            
            {task.comments && task.comments.length > 0 && (
              <CommentHistory comments={task.comments} />
            )}
            
            {(!task.comments || task.comments.length === 0) && (
              <p className="text-xs text-gray-400 italic">No history available</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

