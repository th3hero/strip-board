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
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus } from 'lucide-react';

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: { title: string; description?: string }) => void;
  isLoading?: boolean;
}

export function AddTaskModal({ open, onOpenChange, onAdd, isLoading }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
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
            <Plus className="w-5 h-5 text-orange-500" />
            Add New Task
          </DialogTitle>
          <DialogDescription>
            Create a new task with title and optional description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <Textarea
              id="description"
              placeholder="Add more details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Press Cmd/Ctrl + Enter to submit
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
            {isLoading ? 'Adding...' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

