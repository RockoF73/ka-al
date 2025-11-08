import { prisma } from '../db';

export async function getThreadsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where: { categoryId },
      skip,
      take: limit,
      orderBy: [
        { isPinned: 'desc' },
        { lastPostAt: 'desc' },
      ],
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: { posts: true },
        },
      },
    }),
    prisma.thread.count({
      where: { categoryId },
    }),
  ]);

  return {
    threads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getThreadBySlug(slug: string) {
  return prisma.thread.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
          reputation: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      _count: {
        select: { posts: true },
      },
    },
  });
}

export async function createThread(data: {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
}) {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return prisma.thread.create({
    data: {
      title: data.title,
      slug: `${slug}-${Date.now()}`,
      authorId: data.authorId,
      categoryId: data.categoryId,
      posts: {
        create: {
          content: data.content,
          authorId: data.authorId,
        },
      },
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
}

export async function incrementThreadViews(threadId: string) {
  return prisma.thread.update({
    where: { id: threadId },
    data: { views: { increment: 1 } },
  });
}

