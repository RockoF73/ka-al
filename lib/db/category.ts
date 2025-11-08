import { prisma } from '../db';

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      threads: {
        take: 1,
        orderBy: { lastPostAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          _count: {
            select: { posts: true },
          },
        },
      },
      _count: {
        select: { threads: true },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { threads: true },
      },
    },
  });
}

