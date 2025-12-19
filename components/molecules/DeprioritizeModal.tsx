'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { AlertTriangle } from 'lucide-react';

interface DeprioritizeModalProps {
  open: boolean;
  taskTitle: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function DeprioritizeModal({
  open,
  taskTitle,
  onConfirm,
  onCancel,
}: DeprioritizeModalProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason.trim());
      setReason('');
    }
  };

  const handleCancel = () => {
    setReason('');
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <DialogTitle>Deprioritizing Task</DialogTitle>
          </div>
          <DialogDescription>
            <strong>&quot;{taskTitle}&quot;</strong> is currently <strong>In Progress</strong>.
            <br />
            Moving another task to #1 will pause this task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Why are you pausing this task? <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="reason"
              placeholder="E.g., Client requested urgent bug fix, Higher priority work came up..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              This will be added to task history for stakeholder visibility.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Pause & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

