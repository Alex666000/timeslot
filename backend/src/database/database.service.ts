import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.getOrThrow<string>('DB_HOST'),
      port: Number(this.configService.getOrThrow<string>('DB_PORT')),
      user: this.configService.getOrThrow<string>('DB_USER'),
      database: this.configService.getOrThrow<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
    });
  }

  query<T extends QueryResultRow>(text: string, values?: unknown[]) {
    return this.pool.query<T>(text, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
