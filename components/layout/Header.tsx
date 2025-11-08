import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { UserMenu } from './UserMenu';
import { Rocket } from 'lucide-react';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="bg-space-dark/80 backdrop-blur-sm border-b border-space-accent/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Rocket className="w-6 h-6 text-space-accent group-hover:animate-pulse" />
            <span className="text-xl font-bold glow-text">Kazinga Alliance</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-space-accent transition-colors"
            >
              Forum
            </Link>
            <Link
              href="/categories"
              className="text-gray-300 hover:text-space-accent transition-colors"
            >
              Categories
            </Link>
            {user && (
              <Link
                href="/threads/new"
                className="px-4 py-2 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium"
              >
                New Thread
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:text-space-accent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

