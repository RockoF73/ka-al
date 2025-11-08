import { prisma } from '../db';
import bcrypt from 'bcryptjs';

export async function createUser(data: {
  email: string;
  username: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      role: true,
      reputation: true,
      createdAt: true,
      lastSeen: true,
    },
  });
}

