import { SignInForm } from '@/components/auth/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-space-light/50 backdrop-blur-sm rounded-lg border border-space-accent/20 p-8">
        <h1 className="text-3xl font-bold mb-2 text-center glow-text">
          Sign In
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Welcome back to Kazinga Alliance
        </p>
        <SignInForm />
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-space-accent hover:text-space-accentDark transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

