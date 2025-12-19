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

interface BlockedModalProps {
  open: boolean;
  taskTitle: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function BlockedModal({ open, taskTitle, onConfirm, onCancel }: BlockedModalProps) {
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
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Mark Task as Blocked
          </DialogTitle>
          <DialogDescription>
            You're about to mark <strong>"{taskTitle}"</strong> as blocked.
            Please provide a reason for blocking this task.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Why is this task blocked? (e.g., Waiting for API access, dependencies not ready...)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="bg-red-500 hover:bg-red-600"
          >
            Mark as Blocked
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

