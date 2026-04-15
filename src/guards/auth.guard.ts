import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const { data } = await axios.get('http://localhost:3001/auth/validate', {
        headers: { authorization: token },
      });

      if (!data.valid) throw new UnauthorizedException('Invalid token');

      // بنحط بيانات اليوزر في الـ request عشان نستخدمها في الـ controllers
      request.user = { userId: data.userId, email: data.email, role: data.role };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}