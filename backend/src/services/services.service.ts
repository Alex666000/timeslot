import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { GetServicesQueryDto, ServiceSortBy, SortOrder } from './dto/get-services-query.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import type { GetServicesResult, ServiceItem } from './services.types.js';

@Injectable()
export class ServicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(query: GetServicesQueryDto): Promise<GetServicesResult> {
    const {
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = SortOrder.Asc,
      page = 1,
      pageSize = 10,
    } = query;

    const conditions: string[] = [];
    const values: unknown[] = [];

    const normalizedSearch = search?.trim();

    if (normalizedSearch) {
      values.push(`%${normalizedSearch}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }

    if (minPrice !== undefined) {
      values.push(minPrice);
      conditions.push(`price >= $${values.length}`);
    }

    if (maxPrice !== undefined) {
      values.push(maxPrice);
      conditions.push(`price <= $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const direction = sortOrder === SortOrder.Desc ? 'DESC' : 'ASC';

    let orderBy = 'id ASC';

    if (sortBy === ServiceSortBy.Price) {
      orderBy = `price ${direction}, id ASC`;
    }

    if (sortBy === ServiceSortBy.Name) {
      orderBy = `name ${direction}, id ASC`;
    }

    const countResult = await this.databaseService.query<{ total: number }>(
      `
          SELECT COUNT(*) ::int AS total
          FROM services ${whereClause}
      `,
      values,
    );

    const total = countResult.rows[0].total;
    const offset = (page - 1) * pageSize;

    const paginationValues = [...values, pageSize, offset];

    const limitParam = `$${values.length + 1}`;
    const offsetParam = `$${values.length + 2}`;

    const servicesResult = await this.databaseService.query<ServiceItem>(
      `
          SELECT id, name, price
          FROM services ${whereClause}
          ORDER BY ${orderBy} LIMIT ${limitParam}
          OFFSET ${offsetParam}
      `,
      paginationValues,
    );

    return {
      items: servicesResult.rows,
      total,
      page,
      pageSize,
      pagesCount: Math.ceil(total / pageSize),
    };
  }

  async getById(id: number): Promise<ServiceItem> {
    const result = await this.databaseService.query<ServiceItem>(
      `
          SELECT id, name, price
          FROM services
          WHERE id = $1
      `,
      [id],
    );

    const service = result.rows[0];

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  async create(dto: CreateServiceDto): Promise<ServiceItem> {
    const result = await this.databaseService.query<ServiceItem>(
      `
          INSERT INTO services (name, price)
          VALUES ($1, $2) RETURNING id, name, price
      `,
      [dto.name, dto.price],
    );

    return result.rows[0];
  }

  async update(id: number, dto: UpdateServiceDto): Promise<ServiceItem> {
    const updates: string[] = [];
    const values: unknown[] = [];

    if (dto.name !== undefined) {
      values.push(dto.name);
      updates.push(`name = $${values.length}`);
    }

    if (dto.price !== undefined) {
      values.push(dto.price);
      updates.push(`price = $${values.length}`);
    }

    if (updates.length === 0) {
      return this.getById(id);
    }

    values.push(id);

    const idParam = `$${values.length}`;

    const result = await this.databaseService.query<ServiceItem>(
      `
          UPDATE services
          SET ${updates.join(', ')}
          WHERE id = ${idParam} RETURNING id, name, price
      `,
      values,
    );

    const service = result.rows[0];

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  async remove(id: number): Promise<void> {
    const result = await this.databaseService.query<{ id: number }>(
      `
      DELETE FROM services
      WHERE id = $1
      RETURNING id
    `,
      [id],
    );

    if (!result.rows[0]) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
