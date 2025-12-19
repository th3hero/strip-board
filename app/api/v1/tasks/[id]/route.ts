import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { connectDB } from '../../../../../lib/db/mongoose';
import Task from '../../../../../lib/db/models/Task';

type Params = Promise<{ id: string }>;

// PATCH /api/v1/tasks/:id - Update task
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const task = await Task.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update fields
    if (body.title !== undefined) task.title = body.title.trim();
    if (body.description !== undefined) task.description = body.description?.trim();
    if (body.status !== undefined) {
      task.status = body.status;
      if (body.status === 'done' && !task.completedAt) {
        task.completedAt = new Date();
      }
    }
    if (body.labels !== undefined) task.labels = body.labels;
    if (body.dueDate !== undefined) task.dueDate = body.dueDate ? new Date(body.dueDate) : undefined;
    if (body.blockedReason !== undefined) task.blockedReason = body.blockedReason?.trim();
    
    // Add comment if provided
    if (body.comment) {
      task.comments.push({
        text: body.comment.text,
        type: body.comment.type,
        createdAt: new Date(),
      });
    }

    await task.save();

    return NextResponse.json({
      success: true,
      data: {
        ...task.toObject(),
        _id: task._id.toString(),
        userId: task.userId.toString(),
      },
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/tasks/:id - Delete task
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectDB();

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Task deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

