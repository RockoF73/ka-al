import { SignUpForm } from '@/components/auth/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-space-light/50 backdrop-blur-sm rounded-lg border border-space-accent/20 p-8">
        <h1 className="text-3xl font-bold mb-2 text-center glow-text">
          Join Kazinga Alliance
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Create your account to join the forum
        </p>
        <SignUpForm />
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-space-accent hover:text-space-accentDark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

