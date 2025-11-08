'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/lib/validations';

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const validated = signUpSchema.parse({ email, username, password });

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      router.push('/auth/signin?registered=true');
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-space-danger/20 border border-space-danger rounded-lg text-space-danger text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors"
          placeholder="username"
          required
        />
        <p className="mt-1 text-xs text-gray-400">
          3-20 characters, letters, numbers, underscores, and hyphens only
        </p>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors"
          placeholder="••••••••"
          required
        />
        <p className="mt-1 text-xs text-gray-400">
          At least 8 characters with uppercase, lowercase, and number
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}

