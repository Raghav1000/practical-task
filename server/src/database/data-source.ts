import { User } from '../modules/users/users.entity';
import { DataSource } from 'typeorm';
import { Post, PostLike } from '../modules/posts/posts.entity';

// npx typeorm-ts-node-commonjs migration:generate \
// src/database/migrations/<MigrationName> \
// -d src/database/data-source.ts

// npx typeorm-ts-node-commonjs migration:run \
// -d src/database/data-source.ts

// npx typeorm-ts-node-commonjs migration:revert -d src/database/data-source.ts

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: [User, Post, PostLike],
  migrations: ['src/database/migrations/*.ts'],
});
