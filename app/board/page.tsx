import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { StripBoard } from '../../components/organisms/StripBoard';
import { LogoutButton } from '../../components/molecules/LogoutButton';

export default async function BoardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Priority Strip
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome, {session.user.name}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <StripBoard />
      </main>
    </div>
  );
}

