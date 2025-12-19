// Task Types
export type TaskStatus = 'todo' | 'in-progress' | 'paused' | 'done' | 'blocked';

export type CommentType = 'deprioritized' | 'blocked' | 'note' | 'started' | 'paused' | 'resumed' | 'completed';

export interface TaskComment {
  text: string;
  type: CommentType;
  createdAt: Date;
}

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: number; // Higher number = higher priority (bottom of stack)
  labels?: string[];
  dueDate?: Date;
  blockedReason?: string;
  comments: TaskComment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: number;
  labels?: string[];
  dueDate?: Date;
  blockedReason?: string;
  comment?: {
    text: string;
    type: CommentType;
  };
}

// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ReorderTasksInput {
  taskIds: string[]; // Array of task IDs in new order (top to bottom)
}

