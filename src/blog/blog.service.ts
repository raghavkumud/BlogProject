import { Injectable } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";

import { PrismaService } from "../prisma/prisma.service";
import { CreateBlogDto, EditBlogDto } from "./dto";

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) {
    }
    getBlogs(userId: string) {
        return this.prisma.blog.findMany({
            where: {
                authorId: userId
            }
        });
    }
    async createBlog(userId: string, dto: CreateBlogDto) {
        return this.prisma.blog.create(
            {
                data: {
                    ...dto,
                    authorId: userId
                }
            }
        )
    }
    getBlogById(userId: string, blogId: string) {
        return this.prisma.blog.findFirst({
            where: {
                id: blogId,
                authorId: userId,
            }
        })
    }
    async editBlogById(userId: string, dto: EditBlogDto, blogId: string) {
        const blog = await this.prisma.blog.findUnique({
            where: {
                id: blogId
            }
        })
        if (!blog || blog.authorId !== userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return this.prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                ...dto
            }
        })
    }
    async deleteBlog(userId: string, blogId: string) {
        const blog = await this.prisma.blog.findUnique({
            where: {
                id: blogId
            }
        })
        if (!blog || blog.authorId !== userId) {
            throw new ForbiddenException('Access to resource denied');

        }
        await this.prisma.blog.delete({
            where: {
                id: blogId,
            }
        })
    }
}