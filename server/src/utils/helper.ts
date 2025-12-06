import { Post, PostLike } from 'src/modules/posts/posts.entity';
import { PostResponse } from 'src/types/post.types';
import { randomBytes } from 'crypto';

export function mapPost(post: Post, likes: PostLike[]): PostResponse {
  const recentLikes = likes.map((l) => ({
    userId: l.user.id,
    name: l.user.name,
  }));

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    imageURL: post.imageURL,
    likeCount: post.likeCount,
    author: { id: post.author.id, name: post.author.name },
    recentLikes,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export function generateUniqueUsername(name: string): string {
  const base =
    name
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^a-z0-9]/g, '') || 'user';

  const time = Date.now().toString(36);
  const rand = randomBytes(2).toString('hex');

  const username = `${base}_${time}_${rand}`;

  return username.slice(0, 15);
}
