import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [AuthModule, MachinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
