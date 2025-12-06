import { User } from '../../modules/users/users.entity';
import { Post, PostLike } from '../../modules/posts/posts.entity';
import * as bcrypt from 'bcrypt';

const bios = [
  'I love coding.',
  'Tech enthusiast.',
  'Coffee addict.',
  'Traveller.',
  'Builder.',
];

export async function createUsers(count: number): Promise<User[]> {
  const users: User[] = [];
  const passwordHash = await bcrypt.hash('password123', 10);

  for (let i = 1; i <= count; i++) {
    const user = new User();
    user.name = `User ${i}`;
    user.username = `user${i}`;
    user.email = `user${i}@example.com`;
    user.hashPassword = passwordHash;
    user.bio = bios[Math.floor(Math.random() * bios.length)];
    users.push(user);
  }

  return users;
}

export function createPosts(users: User[], count: number): Post[] {
  const posts: Post[] = [];

  for (let i = 1; i <= count; i++) {
    const post = new Post();
    post.title = `Post Title ${i}`;
    post.description = `Description for post ${i}`;
    post.imageURL =
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-beach-free-image-after-sunset-sky-free-photo.jpeg?w=2210&quality=70';

    const author = users[Math.floor(Math.random() * users.length)];
    post.author = author;

    post.likeCount = 0;
    posts.push(post);
  }

  return posts;
}

export function createLikes(posts: Post[], users: User[]): PostLike[] {
  const likes: PostLike[] = [];

  for (const post of posts) {
    const likeCount = Math.floor(Math.random() * 20);
    const usedUserIds = new Set<number>();

    for (let i = 0; i < likeCount; i++) {
      const user = users[Math.floor(Math.random() * users.length)];

      if (usedUserIds.has(user.id)) continue;
      usedUserIds.add(user.id);

      const like = new PostLike();
      like.user = user;
      like.post = post;

      likes.push(like);
      post.likeCount += 1;
    }
  }

  return likes;
}
