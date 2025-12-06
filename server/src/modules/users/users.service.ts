import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async me(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id: id },
      relations: ['posts'],
    });
    return user;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.usersRepo.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (exists) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 12);

    const user = this.usersRepo.create({
      ...dto,
      hashPassword: hashed,
    });

    return this.usersRepo.save(user);
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? [
          { name: Like(`%${search}%`) },
          { username: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { bio: Like(`%${search}%`) },
        ]
      : {};

    const [data, total] = await this.usersRepo.findAndCount({
      where,
      skip,
      take: limit,
      order: { updatedAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.username) {
      const user = await this.findByUsername(dto.username);
      if (user && user?.username !== dto.username) {
        if (user) throw new BadRequestException('Username already exists');
      }
    }
    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.usersRepo.delete(id);
  }
}
