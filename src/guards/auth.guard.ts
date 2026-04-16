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

    if (!token) throw new UnauthorizedException('no token provided');

    try {
      const { data } = await axios.get('http://localhost:3001/auth/validate', {
        headers: { authorization: token },
      });

      if (!data.valid) throw new UnauthorizedException('invalid token');

      request.user = { userId: data.userId, email: data.email, role: data.role };
      return true;
    } catch {
      throw new UnauthorizedException('invalid token');
    }
  }
}