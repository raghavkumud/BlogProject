import { blogStub } from "../../../test/stubs/blog.stub";


export const BlogService = jest.fn().mockReturnValue({
    createBlog: jest.fn().mockReturnValue(blogStub()),
    getBlogs: jest.fn().mockReturnValue([blogStub()]),
    getBlogById: jest.fn().mockReturnValue(() => "abce"),
    deleteBlog: jest.fn().mockReturnValue(() => "abce"),
    editBlogById: jest.fn().mockReturnValue(blogStub())
})