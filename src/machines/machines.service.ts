import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CreateMachineDto } from './dto/create-machine.dto';

@Injectable()
export class MachinesService {
  private machineServiceUrl = 'http://localhost:3002/machines';

  async create(dto: CreateMachineDto, userId: string) {
    try {
      const { data } = await axios.post(this.machineServiceUrl, dto, {
        headers: { 'x-user-id': userId },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        error.response?.data?.message || 'Failed to create machine',
      );
    }
  }

  async findAll(userId: string, page: number, limit: number) {
    try {
      const { data } = await axios.get(this.machineServiceUrl, {
        headers: { 'x-user-id': userId },
        params: { page, limit },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        error.response?.data?.message || 'Failed to fetch machines',
      );
    }
  }
}