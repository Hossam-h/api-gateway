import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('machines')
export class MachinesController {
  constructor(private machinesService: MachinesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateMachineDto, @Request() req) {
    return this.machinesService.create(dto, req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.machinesService.findAll(req.user.userId, page, limit);
  }
}