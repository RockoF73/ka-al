import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <Rocket className="w-24 h-24 text-space-accent animate-pulse" />
      <h1 className="text-6xl font-bold glow-text">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300">
        Page Not Found
      </h2>
      <p className="text-gray-400 max-w-md">
        The page you're looking for has drifted off into the void of space.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium"
      >
        Return to Home
      </Link>
    </div>
  );
}

