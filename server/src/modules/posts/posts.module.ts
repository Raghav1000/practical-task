import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, PostLike } from './posts.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostLike, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
