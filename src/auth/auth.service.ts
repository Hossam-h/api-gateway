import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private authServiceUrl = 'http://localhost:3001/auth';

  async register(dto: RegisterDto) {
    try {
      const { data } = await axios.post(`${this.authServiceUrl}/register`, dto);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        error.response?.data?.message || 'Registration failed',
      );
    }
  }

  async login(dto: LoginDto) {
    try {
      const { data } = await axios.post(`${this.authServiceUrl}/login`, dto);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        error.response?.data?.message || 'Login failed',
      );
    }
  }
}