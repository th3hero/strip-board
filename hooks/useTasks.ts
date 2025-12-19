import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, CreateTaskInput, UpdateTaskInput, ReorderTasksInput } from '../types';

// Fetch all tasks
async function fetchTasks(): Promise<Task[]> {
  const res = await fetch('/api/v1/tasks');
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const json = await res.json();
  return json.data;
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}

// Create task
async function createTask(data: CreateTaskInput): Promise<Task> {
  const res = await fetch('/api/v1/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  const json = await res.json();
  return json.data;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Update task
interface UpdateTaskParams {
  id: string;
  data: UpdateTaskInput;
}

async function updateTask({ id, data }: UpdateTaskParams): Promise<Task> {
  const res = await fetch(`/api/v1/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  const json = await res.json();
  return json.data;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map((task) =>
          task._id === id ? { ...task, ...data } : task
        )
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Delete task
async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`/api/v1/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Reorder tasks
async function reorderTasks(data: ReorderTasksInput): Promise<Task[]> {
  const res = await fetch('/api/v1/tasks/reorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to reorder tasks');
  const json = await res.json();
  return json.data;
}

export function useReorderTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderTasks,
    onMutate: async ({ taskIds }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], (old) => {
        if (!old) return [];
        const taskMap = new Map(old.map(t => [t._id, t]));
        return taskIds.map((id, index) => ({
          ...taskMap.get(id)!,
          priority: index,
        }));
      });

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

