import mongoose, { Schema, Model } from 'mongoose';
import { TaskStatus } from '../../../types';

export interface ITaskComment {
  text: string;
  type: 'deprioritized' | 'blocked' | 'note';
  createdAt: Date;
}

export interface ITask {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: number;
  labels?: string[];
  dueDate?: Date;
  blockedReason?: string;
  comments: ITaskComment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'paused', 'done', 'blocked'],
      default: 'todo',
      index: true,
    },
    priority: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    labels: {
      type: [String],
      default: [],
    },
    dueDate: {
      type: Date,
    },
    blockedReason: {
      type: String,
      trim: true,
    },
    comments: {
      type: [
        {
          text: { type: String, required: true, trim: true },
          type: { type: String, enum: ['deprioritized', 'blocked', 'note', 'started', 'paused', 'resumed', 'completed'], required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by user and priority
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ userId: 1, status: 1 });

// Prevent model recompilation in development
const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);

export default Task;

