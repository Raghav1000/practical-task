import {
  Controller,
  Get,
  Param,
  Post as HttpPost,
  Body,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, LikePostDto } from './post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  create(@Body() dto: CreatePostDto, @Body('userId') userId: number) {
    return this.postsService.create(dto, userId);
  }

  @Get()
  findAll(
    @Query('userId') userId,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    if (!userId) {
      throw new InternalServerErrorException('userId not present');
    }
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 50);
    return this.postsService.findAllByUser(Number(userId), pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @HttpPost(':id/like')
  likeUnlike(@Param('id') id: number, @Body() dto: LikePostDto) {
    return this.postsService.likeUnlike(id, dto.userId);
  }
}
