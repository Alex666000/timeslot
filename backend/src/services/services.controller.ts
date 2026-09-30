import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { ServicesService } from './services.service.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
import {UpdateServiceDto} from "./dto/update-service.dto.js";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Get
  @Get()
  getAll() {
    return this.servicesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.getById(id);
  }

  // POST
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  // PATCH
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }
}
