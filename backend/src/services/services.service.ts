import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { GetServicesQueryDto } from './dto/get-services-query.dto.js';

type ServiceItem = {
  id: number;
  name: string;
  price: number;
};

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
  getAll(query: GetServicesQueryDto): ServiceItem[] {
    const { search, minPrice, maxPrice } = query;

    const normalizedSearch = search?.trim().toLowerCase();

    return this.services.filter((service) => {
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
