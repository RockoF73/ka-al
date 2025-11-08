'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <AlertTriangle className="w-24 h-24 text-space-danger" />
      <h1 className="text-4xl font-bold text-space-danger">Something went wrong!</h1>
      <p className="text-gray-400 max-w-md">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-space-light text-gray-300 rounded-lg hover:bg-space-dark transition-colors font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

