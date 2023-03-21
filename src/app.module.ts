import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule, BlogModule, PrismaModule, ConfigModule.forRoot(
    {
      isGlobal: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
