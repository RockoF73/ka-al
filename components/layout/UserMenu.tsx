'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { User, LogOut, Settings } from 'lucide-react';

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-space-light transition-colors"
      >
        <div className="w-8 h-8 bg-space-accent rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-space-darker" />
        </div>
        <span className="hidden md:block text-sm font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-space-light rounded-lg shadow-lg border border-space-accent/20 z-20">
            <div className="p-4 border-b border-space-accent/20">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
              {user.role && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-space-accent/20 text-space-accent rounded">
                  {user.role}
                </span>
              )}
            </div>
            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-space-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-space-dark transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

