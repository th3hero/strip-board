'use client';

import { GripVertical } from 'lucide-react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface DragHandleProps {
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

export function DragHandle({ listeners, attributes }: DragHandleProps) {
  return (
    <div
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
    >
      <GripVertical className="w-5 h-5 text-gray-400" />
    </div>
  );
}

