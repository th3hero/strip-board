'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Edit } from 'lucide-react';
import { Task } from '../../types';

interface EditTaskModalProps {
  open: boolean;
  task: Task | null;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { title: string; description?: string }) => void;
  isLoading?: boolean;
}

export function EditTaskModal({ open, task, onOpenChange, onSave, isLoading }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-orange-500" />
            Edit Task
          </DialogTitle>
          <DialogDescription>
            Update task title and description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="edit-title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
              Description <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <Textarea
              id="edit-description"
              placeholder="Add more details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Press Cmd/Ctrl + Enter to save
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || isLoading}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

