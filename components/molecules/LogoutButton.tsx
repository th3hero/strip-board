'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}

