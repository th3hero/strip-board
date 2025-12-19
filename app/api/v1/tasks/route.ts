import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { connectDB } from '../../../../lib/db/mongoose';
import Task from '../../../../lib/db/models/Task';

// GET /api/v1/tasks - Get all tasks for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const tasks = await Task.find({ userId: session.user.id })
      .sort({ priority: 1 }) // Lower priority first (top of stack)
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
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/v1/tasks - Create new task
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
    const { title, description, labels, dueDate } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get current min priority to add new task at top (lowest priority)
    // Remember: lower priority number = top of stack, higher = bottom
    const minPriorityTask = await Task.findOne({ userId: session.user.id })
      .sort({ priority: 1 })
      .lean();

    const newPriority = minPriorityTask ? minPriorityTask.priority - 1 : 0;

    const task = await Task.create({
      userId: session.user.id,
      title: title.trim(),
      description: description?.trim(),
      labels: labels || [],
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: newPriority,
      status: 'todo',
    });

    return NextResponse.json({
      success: true,
      data: {
        ...task.toObject(),
        _id: task._id.toString(),
        userId: task.userId.toString(),
      },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

