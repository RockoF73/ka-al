import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kazinga-alliance.com' },
    update: {},
    create: {
      email: 'admin@kazinga-alliance.com',
      username: 'Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user');

  // Create categories
  const categories = [
    {
      name: 'General Discussion',
      description: 'General discussions about the guild and game',
      slug: 'general-discussion',
      order: 1,
    },
    {
      name: 'Strategy & Guides',
      description: 'Share strategies, tips, and guides for survival',
      slug: 'strategy-guides',
      order: 2,
    },
    {
      name: 'Recruitment',
      description: 'Looking for members or looking to join',
      slug: 'recruitment',
      order: 3,
    },
    {
      name: 'Events & Activities',
      description: 'Organize and discuss guild events',
      slug: 'events-activities',
      order: 4,
    },
    {
      name: 'Off-Topic',
      description: 'Everything else that doesn\'t fit elsewhere',
      slug: 'off-topic',
      order: 5,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('✅ Created categories');

  // Create a sample thread
  const generalCategory = await prisma.category.findUnique({
    where: { slug: 'general-discussion' },
  });

  if (generalCategory) {
    await prisma.thread.upsert({
      where: { slug: 'welcome-to-kazinga-alliance' },
      update: {},
      create: {
        title: 'Welcome to Kazinga Alliance!',
        slug: 'welcome-to-kazinga-alliance',
        authorId: admin.id,
        categoryId: generalCategory.id,
        isPinned: true,
        posts: {
          create: {
            content: 'Welcome to the Kazinga Alliance forum! This is where we discuss strategies, organize events, and build our community. Feel free to introduce yourself and start participating in discussions.\n\nLet\'s survive and thrive together in the vastness of space! 🚀',
            authorId: admin.id,
          },
        },
      },
    });

    console.log('✅ Created sample thread');
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

