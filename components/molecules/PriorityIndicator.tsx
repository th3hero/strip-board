'use client';

import { Flame } from 'lucide-react';

interface PriorityIndicatorProps {
  index: number;
  totalTasks: number;
  isHighest: boolean;
}

export function PriorityIndicator({
  index,
  totalTasks,
  isHighest,
}: PriorityIndicatorProps) {
  // index 0 = top (#1 priority), descending order
  const displayNumber = index + 1;

  return (
    <div className="flex items-center gap-2">
      {isHighest && (
        <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
      )}
      <span className="text-sm font-semibold text-gray-600">
        #{displayNumber}
      </span>
    </div>
  );
}

