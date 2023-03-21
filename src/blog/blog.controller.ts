import { Controller, UseGuards, Get, Post, Patch, Delete, Param, Body, HttpStatus } from "@nestjs/common";
import { HttpCode } from "@nestjs/common/decorators";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { BlogService } from "./blog.service";
import { CreateBlogDto, EditBlogDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) { }
    @Get('')
    getBlogs(@GetUser('id') userId: string) {
        return this.blogService.getBlogs(userId);
    }
    @Post()
    createBlog(@GetUser('id') userId: string,
        @Body() dto: CreateBlogDto,) {

        console.log({
            id: userId
        })
        return this.blogService.createBlog(userId, dto);
    }
    @Get(':id')
    getBlogById(@GetUser('id') userId: string,
        @Param('id') blogId: string
    ) {
        return this.blogService.getBlogById(userId, blogId);
    }
    @Patch(':id')
    editBlogById(@GetUser('id') userId: string,
        @Body() dto: EditBlogDto, @Param('id') blogId: string) {
        return this.blogService.editBlogById(userId, dto, blogId);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteBlog(@GetUser('id') userId: string,
        @Param('id') blogId: string) {
        return this.blogService.deleteBlog(userId, blogId);
    }

}