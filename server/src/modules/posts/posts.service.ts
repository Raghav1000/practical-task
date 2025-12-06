import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostLike } from './posts.entity';
import { User } from '../users/users.entity';
import { CreatePostDto } from './post.dto';
import { mapPost } from 'src/utils/helper';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(PostLike) private readonly likeRepo: Repository<PostLike>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const author = await this.userRepo.findOne({
      where: { id: createPostDto.userId },
    });
    if (!author) throw new NotFoundException('User not found');

    const post = this.postRepo.create({ ...createPostDto, author });
    return this.postRepo.save(post);
  }

  async findAllByUser(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    page = Math.max(1, page);
    limit = Math.min(20, Math.max(1, limit));

    const [posts, total] = await this.postRepo.findAndCount({
      where: { author: { id: userId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    if (posts.length === 0) {
      return { data: [], total, page, lastPage: 1 };
    }

    const postIds = posts.map((p) => p.id);

    const likes = await this.likeRepo
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('like.post', 'post')
      .where('like.postId IN (:...postIds)', { postIds })
      .orderBy('like.createdAt', 'DESC')
      .getMany();

    const likeBucket: Record<number, PostLike[]> = {};
    for (const like of likes) {
      const pid = like.post.id;
      if (!likeBucket[pid]) likeBucket[pid] = [];
      if (likeBucket[pid].length < 5) likeBucket[pid].push(like);
    }

    const data = posts.map((p) => mapPost(p, likeBucket[p.id] ?? []));

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) throw new NotFoundException('Post not found');

    const likes = await this.likeRepo
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.user', 'user')
      .where('like.postId = :postId', { postId: id })
      .orderBy('like.createdAt', 'DESC')
      .limit(5)
      .getMany();

    return mapPost(post, likes);
  }

  async likeUnlike(postId: number, userId: number) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
    });
    if (!post) throw new NotFoundException('Post not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      post.likeCount = Math.max(0, post.likeCount - 1);
    } else {
      const like = this.likeRepo.create({ post, user });
      await this.likeRepo.save(like);
      post.likeCount += 1;
    }

    await this.postRepo.save(post);
    return { likeCount: post.likeCount };
  }
}
