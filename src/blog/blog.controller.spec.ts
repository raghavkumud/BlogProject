import { Test } from "@nestjs/testing";
import { blogStub } from "../../test/stubs/blog.stub";

import { BlogController } from "./blog.controller";

import { BlogService } from "./blog.service";

jest.mock('./blog.service')
describe('Blog Controller', () => {
    let blogController: BlogController;
    let blogService: BlogService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [BlogController],
            providers: [BlogService]
        }).compile();
        blogController = moduleRef.get<BlogController>(BlogController);
        blogService = moduleRef.get<BlogService>(BlogService);
        jest.clearAllMocks();
    })
    describe("get blogs", () => {
        describe("when getBlogs is called", () => {
            let blogs: any;
            beforeEach(async () => {
                blogs = await blogController.getBlogs(blogStub().authorId);
            })

            test('then it should call blog service', () => {
                expect(blogService.getBlogs).toBeCalledWith(blogStub().authorId);
            })
            test('then it should an array of blogs', () => {
                expect(blogs).toEqual([blogStub()])
            })
        })
    })
})