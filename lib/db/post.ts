import { prisma } from '../db';

export async function getPostsByThread(
  threadId: string,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { threadId },
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            reputation: true,
            role: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.post.count({
      where: { threadId },
    }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createPost(data: {
  content: string;
  authorId: string;
  threadId: string;
}) {
  const [post, thread] = await Promise.all([
    prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            reputation: true,
            role: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.thread.update({
      where: { id: data.threadId },
      data: { lastPostAt: new Date() },
    }),
  ]);

  return post;
}

export async function updatePost(postId: string, content: string, authorId: string) {
  return prisma.post.updateMany({
    where: {
      id: postId,
      authorId, // Ensure user can only edit their own posts
    },
    data: {
      content,
      isEdited: true,
      updatedAt: new Date(),
    },
  });
}

export async function deletePost(postId: string, authorId: string, userRole: string) {
  // Only allow deletion if user is author or admin/moderator
  if (userRole === 'ADMIN' || userRole === 'MODERATOR') {
    return prisma.post.delete({
      where: { id: postId },
    });
  }

  return prisma.post.deleteMany({
    where: {
      id: postId,
      authorId,
    },
  });
}

