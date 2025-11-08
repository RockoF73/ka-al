import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-space-dark/80 backdrop-blur-sm border-t border-space-accent/20 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Kazinga Alliance. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/rules"
              className="text-gray-400 hover:text-space-accent transition-colors"
            >
              Rules
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-space-accent transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-space-accent transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

