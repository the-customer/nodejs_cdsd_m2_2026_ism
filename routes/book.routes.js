import { Router } from "express";
import bookCtrl from "../controllers/books.controller.js";

const router = Router();

/**
 * GET /api/books?limit=...&available=...&q=...
 * Retrieve all books : using Query Params
 */
router.get('/',bookCtrl.list)
/**
 * POST /books
 * request body
 */
router.post('/',bookCtrl.add);
/**
 * GET /api/books/:id
 * Path Params
 */
router.get('/:id',bookCtrl.getById);
/**
 * PATCH /books/:id
 * update a part of the resource
 */
router.patch('/:id',bookCtrl.update);
/**
 * DELETE /books/:id
 * to delete a book from the database
 */
router.delete("/:id",bookCtrl.delete);

export default router;