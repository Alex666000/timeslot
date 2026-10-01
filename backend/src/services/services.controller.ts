import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { GetServicesQueryDto } from './dto/get-services-query.dto.js';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ServiceResponseDto } from './dto/service-response.dto.js';
import { GetServicesResponseDto } from './dto/get-services-response.dto.js';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
    summary: 'Get services',
  })
  @ApiOkResponse({
    description: 'Services successfully received',
    type: GetServicesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })

  // Get
  @Get()
  getAll(@Query() query: GetServicesQueryDto) {
    return this.servicesService.getAll(query);
  }

  @ApiOperation({
    summary: 'Get service by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Service ID',
  })
  @ApiOkResponse({
    description: 'Service successfully received',
    type: ServiceResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid service ID',
  })
  @ApiNotFoundResponse({
    description: 'Service not found',
  })

  // Get By id
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.getById(id);
  }

  // POST
  @ApiOperation({
    summary: 'Create service',
  })
  @ApiCreatedResponse({
    description: 'Service successfully created',
    type: ServiceResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
  })
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @ApiOperation({
    summary: 'Update service',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Service ID',
  })
  @ApiOkResponse({
    description: 'Service successfully updated',
    type: ServiceResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid service ID or request body',
  })
  @ApiNotFoundResponse({
    description: 'Service not found',
  })
  // PATCH
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete service',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Service ID',
  })
  @ApiNoContentResponse({
    description: 'Service successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Invalid service ID',
  })
  @ApiNotFoundResponse({
    description: 'Service not found',
  })
  // Delete
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.servicesService.remove(id);
  }
}
