import { Injectable } from '@nestjs/common';

type ServiceItem = {
  id: number;
  name: string;
  price: number;
};

@Injectable()
export class ServicesService {
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

  getAll(): ServiceItem[] {
    return this.services;
  }
}