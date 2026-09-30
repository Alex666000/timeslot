import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { GetServicesQueryDto, ServiceSortBy, SortOrder } from './dto/get-services-query.dto.js';
import type { GetServicesResult, ServiceItem } from './services.types.js';

@Injectable()
export class ServicesService {
  private nextId = 4;

  private readonly services: ServiceItem[] = [
    {
      id: 1,
      name: 'Стрижка',
      price: 1500,
    },
    {
      id: 2,
      name: 'Массаж',
      price: 2500,
    },
    {
      id: 3,
      name: 'Консультация',
      price: 3000,
    },
  ];

  // GET
  getAll(query: GetServicesQueryDto): GetServicesResult {
    const {
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = SortOrder.Asc,
      page = 1,
      pageSize = 10,
    } = query;

    const normalizedSearch = search?.trim().toLowerCase();

    const filteredServices = this.services.filter((service) => {
      if (normalizedSearch && !service.name.toLowerCase().includes(normalizedSearch)) {
        return false;
      }

      if (minPrice !== undefined && service.price < minPrice) {
        return false;
      }

      if (maxPrice !== undefined && service.price > maxPrice) {
        return false;
      }

      return true;
    });

    // sort
    const sortedServices = sortBy
      ? filteredServices.sort((a, b) => {
          let comparison = 0;

          if (sortBy === ServiceSortBy.Price) {
            comparison = a.price - b.price;
          }

          if (sortBy === ServiceSortBy.Name) {
            comparison = a.name.localeCompare(b.name, 'ru');
          }

          return sortOrder === SortOrder.Desc ? -comparison : comparison;
        })
      : filteredServices;

    // pagination
    const total = sortedServices.length;
    const offset = (page - 1) * pageSize;
    const items = sortedServices.slice(offset, offset + pageSize);

    const pagesCount = Math.ceil(total / pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      pagesCount,
    };
  }

  getById(id: number): ServiceItem {
    const service = this.services.find((service) => service.id === id);

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  // POST
  create(dto: CreateServiceDto): ServiceItem {
    const service: ServiceItem = {
      id: this.nextId++,
      name: dto.name,
      price: dto.price,
    };
    this.services.push(service);

    return service;
  }

  // PATCH
  update(id: number, dto: UpdateServiceDto): ServiceItem {
    const service = this.getById(id);

    Object.assign(service, dto);

    return service;
  }

  // DELETE
  remove(id: number): void {
    const index = this.services.findIndex((service) => service.id === id);

    if (index === -1) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    this.services.splice(index, 1);
  }
}
