import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service"

describe("Blog Service", () => {
    let blogService: BlogService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [BlogController],
            providers: [BlogService, PrismaService, ConfigService]
        }).compile();
        blogService = moduleRef.get<BlogService>(BlogService);
    })
    it('should be defined', () => {
        expect(blogService).toBeDefined();
    })
})