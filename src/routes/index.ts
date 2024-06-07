import { Hono } from 'hono';
import { getBooks, createBook, getBookById, updateBook, deletePost } from '@/src/controllers/BookController';

const router = new Hono()

router.get('/', (c) => getBooks(c));
router.post('/', (c) => createBook(c));
router.get('/:id', (c) => getBookById(c));
router.patch('/:id', (c) => updateBook(c));
router.delete('/:id', (c) => deletePost(c));

export const Routes = router;