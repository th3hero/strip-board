import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { connectDB } from '../../../../../lib/db/mongoose';
import Task from '../../../../../lib/db/models/Task';

// POST /api/v1/tasks/reorder - Reorder tasks
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { taskIds } = body;

    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid task IDs' },
        { status: 400 }
      );
    }

    await connectDB();

    // Update priority for each task
    // taskIds array is ordered from top to bottom
    // Index 0 (top) = lowest priority, last index (bottom) = highest priority
    const updatePromises = taskIds.map((taskId, index) =>
      Task.updateOne(
        { _id: taskId, userId: session.user.id },
        { $set: { priority: index } }
      )
    );

    await Promise.all(updatePromises);

    // Fetch updated tasks
    const tasks = await Task.find({ userId: session.user.id })
      .sort({ priority: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: tasks.map((task) => ({
        ...task,
        _id: task._id.toString(),
        userId: task.userId.toString(),
      })),
    });
  } catch (error) {
    console.error('Error reordering tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder tasks' },
      { status: 500 }
    );
  }
}

