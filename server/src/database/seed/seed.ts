import { AppDataSource } from '../data-source';
import { createUsers, createPosts, createLikes } from './factories';

async function runSeed() {
  await AppDataSource.initialize();
  console.log('Database connected.');

  const userRepo = AppDataSource.getRepository('users');
  const postRepo = AppDataSource.getRepository('posts');
  const likeRepo = AppDataSource.getRepository('post_likes');

  console.log('Creating users...');
  const users = await createUsers(20);
  await userRepo.save(users);

  console.log('Creating posts...');
  const posts = createPosts(users, 100);
  const savedPosts = await postRepo.save(posts);

  console.log('Creating likes...');
  const likes = createLikes(posts, users);
  await likeRepo.save(likes);

  for (const post of savedPosts) {
    await postRepo.update(post.id, { likeCount: post.likeCount });
  }

  console.log('Seed completed successfully.');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
