# Kazinga Alliance Forum

A modern, high-performance forum application built with Next.js 15, TypeScript, and Prisma. Designed for the Kazinga Alliance gaming guild with a survival/space theme.

## Features

- 🚀 **Next.js 15** with App Router and Server Components
- 🔒 **Secure Authentication** with NextAuth.js and bcrypt
- 💾 **SQLite Database** with Prisma ORM
- 🎨 **Modern UI** with Tailwind CSS and space/survival theme
- ⚡ **Performance Optimized** with server-side rendering and caching
- 🛡️ **Security First** with input validation, CSRF protection, and secure headers
- 📱 **Responsive Design** for all devices

## Tech Stack

- **Framework**: Next.js 15.1.3
- **Language**: TypeScript 5.7
- **Database**: SQLite with Prisma
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ka-al.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXTAUTH_SECRET`: A random secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your application URL (default: `http://localhost:3000`)

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with initial data
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Credentials

After seeding, you can sign in with:
- **Email**: `admin@kazinga-alliance.com`
- **Password**: `Admin123!`

## Project Structure

```
ka-al.com/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── category/          # Category pages
│   ├── thread/            # Thread pages
│   └── threads/           # Thread creation
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── forum/            # Forum components
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── db/               # Database functions
│   ├── auth.ts           # Authentication helpers
│   └── validations.ts    # Zod schemas
├── prisma/               # Prisma schema and migrations
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with initial data

## Security Features

- Password hashing with bcrypt (12 rounds)
- Input validation with Zod
- SQL injection protection via Prisma
- XSS protection with React
- Secure HTTP headers (HSTS, X-Frame-Options, etc.)
- CSRF protection via NextAuth
- Role-based access control

## Performance Optimizations

- Server-side rendering (SSR)
- Static generation where possible
- Image optimization
- Code splitting
- Database query optimization
- Efficient pagination

## Database Schema

- **User**: Users with roles (ADMIN, MODERATOR, MEMBER)
- **Category**: Forum categories
- **Thread**: Discussion threads
- **Post**: Individual posts in threads
- **Session**: User sessions

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private project for Kazinga Alliance guild.

## Support

For issues or questions, contact the development team.

