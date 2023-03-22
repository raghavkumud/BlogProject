import { Blog } from "@prisma/client";

export function blogStub(): Blog {
    return {
        "id": "641b1222c6308fd20ca8fb63",
        "createdAt": new Date("2023-03-22T14:35:14.717Z"),
        "updatedAt": new Date("2023-03-22T14:35:14.717Z"),
        "title": "FIRST BLOG",
        "content": "THIS IS MY FIRST BLOG",
        "authorId": "6419efdfc1bd040f093b7f1f"
    }
}