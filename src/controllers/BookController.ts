import { Context } from 'hono'
import prisma from "@/prisma/client";

export const getBooks = async (c: Context) => {
    try {
        const books = await prisma.book.findMany({ orderBy: { id: 'desc' } });

        return c.json({
            success: true,
            message: 'List Data Books!',
            data: books
        }, 200);

    } catch (e: unknown) {
        console.error(`Error getting books: ${e}`);
    }
}

export async function createBook(c: Context) {
    try {
        const body = await c.req.parseBody();
  
        const title   = typeof body['title'] === 'string' ? body['title'] : '';
        const description = typeof body['description'] === 'string' ? body['description'] : '';
        const author = typeof body['author'] === 'string' ? body['author'] : '';
  
      const book = await prisma.book.create({
        data: {
          title: title,
          description: description,
          author: author
        }
      });
  
      return c.json({
        success: true,
        message: 'Book Created Successfully!',
        data: book
      }, 201);
  
    } catch (e: unknown) {
      console.error(`Error creating post: ${e}`);
    }
  }

  export async function getBookById(c: Context) {
    try {
        const bookId = parseInt(c.req.param('id'));

        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) {
            return c.json({
                success: false,
                message: 'Book Not Found!',
            }, 404);
        }

        return c.json({
            success: true,
            message: `Detail Data Book By ID : ${bookId}`,
            data: book
        }, 200);

    } catch (e: unknown) {
        console.error(`Error finding book: ${e}`);
    }
}

export async function updateBook(c: Context) {
    try {
        const bookId = parseInt(c.req.param('id'));
        const body = await c.req.parseBody();

        //check if title and content is string
        const title   = typeof body['title'] === 'string' ? body['title'] : '';
        const description = typeof body['description'] === 'string' ? body['description'] : '';
        const author = typeof body['author'] === 'string' ? body['author'] : '';
        
        const book = await prisma.book.update({
            where: { id: bookId },
            data: {
                title: title,
                description: description,
                author: author,
                updatedAt: new Date(),
            },
        });

        return c.json({
            success: true,
            message: 'Book Updated Successfully!',
            data: book
        }, 200);

    } catch (e: unknown) {
        console.error(`Error updating book: ${e}`);
    }
}

export async function deletePost(c: Context) {
    try {
        const bookId = parseInt(c.req.param('id'));
        await prisma.book.delete({
            where: { id: bookId },
        });

        return c.json({
            success: true,
            message: 'Book Deleted Successfully!',
        }, 200);

    } catch (e: unknown) {
        console.error(`Error deleting book: ${e}`);
    }
}