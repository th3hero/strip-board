import { TaskComment, TaskStatus } from '@/types';

export function calculateTimeSpent(comments: TaskComment[], currentStatus?: TaskStatus): number {
  // Calculate total time spent in milliseconds
  // Work time = time between (started/resumed) and (paused/blocked/deprioritized)
  // Also stops counting when task is marked done
  let totalTime = 0;
  let lastStartTime: Date | null = null;

  // Sort comments by creation time to ensure chronological order
  const sortedComments = [...comments].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  for (const comment of sortedComments) {
    const commentTime = new Date(comment.createdAt);

    // Start counting time
    if (comment.type === 'started' || comment.type === 'resumed') {
      lastStartTime = commentTime;
    } 
    // Stop counting time
    else if (
      (comment.type === 'paused' || 
       comment.type === 'blocked' || 
       comment.type === 'deprioritized' ||
       comment.type === 'completed') && 
      lastStartTime
    ) {
      totalTime += commentTime.getTime() - lastStartTime.getTime();
      lastStartTime = null;
    }
  }

  // If currently in progress, add time until now
  // Only if status is 'in-progress'
  if (lastStartTime && currentStatus === 'in-progress') {
    totalTime += Date.now() - lastStartTime.getTime();
  } else if (lastStartTime && !currentStatus) {
    // Fallback: if no status provided but we have a start time
    // assume it's still running (for backward compatibility)
    totalTime += Date.now() - lastStartTime.getTime();
  }

  return totalTime;
}

export function formatTimeSpent(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  } else if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

