import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile/:id')
  me(@Param('id') id: number) {
    return this.usersService.me(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAllUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll(+page, +limit, search);
  }

  @Patch(':id')
  async updateUsers(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const data = await this.usersService.update(id, dto);
    return {
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  async deleteUsers(@Param('id') id: number) {
    const data = await this.usersService.delete(id);
    return {
      message: 'User deleted successfully',
      data,
    };
  }
}
