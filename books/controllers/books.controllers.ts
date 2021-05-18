import express from 'express';
import BooksService from '../services/books.service';
import debug from 'debug';
import ResponseHandler from '../../helpers/response';

const log: debug.IDebugger = debug( 'app:books-controller' );
class BooksController
{
    async listBooks( req: express.Request, res: express.Response )
    {
        const books = await BooksService.list( 100, 0 );
        if ( books.errorMsg )
        {
            return ResponseHandler.sendError( res, books );
        }
        return ResponseHandler.sendData( res, books );
    }

    async addNewBook( req: express.Request, res: express.Response )
    {
        const bookAdded = await BooksService.createBook( req.body, req.body.UserId );
        if ( bookAdded.errorMsg)
        {
            return ResponseHandler.sendError( res, bookAdded );
        }
        return ResponseHandler.sendData( res, bookAdded );
    }
    async fetchAuthorBooks(req: express.Request, res: express.Response )
    {
        const booksPublished = await BooksService.fetchAuthorBook( req.body.id );
        if ( booksPublished.errorMsg)
        {
            return ResponseHandler.sendError( res, booksPublished );
        }
        return ResponseHandler.sendData(res , booksPublished );
    }
    async editBookDetails(req: express.Request, res: express.Response )
    {
        const updatedBooks= await BooksService.patchById( req.body.id , req.body);
        if ( updatedBooks.errorMsg)
        {
            return ResponseHandler.sendError( res, updatedBooks );
        }
        return ResponseHandler.sendMessage( res, updatedBooks );
    }
}
export default new BooksController();
