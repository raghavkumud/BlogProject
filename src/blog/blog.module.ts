import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService]
})
export class BlogModule { }
