import { Router } from "express";
import { books } from "../data.js";


const router = Router();

/**
 * GET /api/books?limit=...&available=...&q=...
 * Retrieve all books : using Query Params
 */
router.get('/',(req,res)=>{
    const q = String(req.query.q || "").trim().toLowerCase(); 
    const available = req.query.available // 1 ou 0 ou undefined
    const limit = req.query.limit ? req.query.limit : "10"
    
    const limitInt = +limit; // Convert into int
    if(Number.isNaN(limitInt)) return res.status(400).json({
        error : `Limit "${limit}" should be a number !`
    });
    if(limit < 1) return res.status(400).json({
        error : `Limit "${limit}" should be greater than 0 !`
    });

    let results = [...books];

    //filter the books
    if(available !==undefined){
        // if(available !== "0" && available !== "1")
        if(!["0","1"].includes(available)) return res.status(400).json({
            error: `"${available}" is not a valid available value, should be 0 or 1!`
        })
        const availableBool = available === "1";
        results = results.filter(b => b.available === availableBool);
    }

    //Search : q
    if(q){
        results = results.filter(b => {
            return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
        })
    }

    //limit
    results = results.slice(0,limit);

    return res.status(200).json({
        data: results,
        count: results.length
    })
})
/**
 * POST /books
 * request body
 */
router.post('/',(req, res) => {
    const {title, author} = req.body || {};

    if(!title || title.trim().length < 2)return res.status(400).json({
        error: "Title is required (min 2 chars)!"
    });

    if(!author || author.trim().length < 2)return res.status(400).json({
        error: "Author is required (min 2 chars)!"
    });

    const newBook = {
        id: books[books.length-1].id + 1,
        title,
        author,
        available: true
    }

    books.push(newBook);

    return res.status(201).json({
        message: "Book created successfully",
        book: newBook
    })
});
/**
 * GET /api/books/:id
 * Path Params
 */
router.get('/:id',(req,res)=>{
    // const idBook = Number(req.params.id);
    const idBook = +req.params.id;
    if(Number.isNaN(idBook)){
        return res.status(400).json({
            error: "id must be a number!"
        })
    }
    const book1 = books.find(b => b.id === idBook);

    return res.status(200).json({
        book: book1
    })
});
/**
 * PATCH /books/:id
 * update a part of the resource
 */
router.patch('/:id',(req,res) => {
    const idBook = +req.params.id;
    if(Number.isNaN(idBook)) return res.status(400).json({
        error: "id must be a number"
    });

    const book = books.find(b => b.id === idBook);
    if(!book) return res.status(400).json({
        error: "Book not found!"
    });

    const {title, author, available} = req.body || {};
    if (title !== undefined) book.title = title.trim() ;
    if (author !== undefined) book.author = author.trim() ;
    if(available !== undefined){
        if(typeof available !=="boolean"){
            return res.status(400).json({
                error: "Available must be a boolean!"
            });
        }
        book.available = available;
    }
    return res.status(200).json({
        message: "Book updated successfully",
        book
    })
});
/**
 * DELETE /books/:id
 * to delete a book from the database
 */
router.delete("/:id",(req,res)=>{
    const idBook = +req.params.id;
    if(Number.isNaN(idBook)) return res.status(400).json({
        error: "id must be a number"
    });
    const index = books.findIndex(b => b.id === idBook);
    if(index === -1) return res.status(400).json({
        error: "Book not found"
    });
    const deletedBook = books.splice(index,1)[0];

    return res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook
    })
});

export default router;