import { CommonRoutesConfig } from './../common/common.routes.config';
import BooksController from './controllers/books.controllers';
// import UsersMiddleware from './middleware/users.middleware';
import express from 'express';


export class BooksRoutes extends CommonRoutesConfig
{
    constructor( app: express.Application )
    {
        super( app, 'BooksRoutes' );
    }

    configureRoutes()
    {
        this.app
            .route( `/books` )
            .get( BooksController.listBooks );
        this.app
            .route( `/createBook` )
            .post( BooksController.addNewBook );
        this.app
            .route( `/authorBooks` )
            .get( BooksController.fetchAuthorBooks );
        this.app
            .route( `/editBook` )
            .post( BooksController.editBookDetails );
        
        return this.app;

    }
}
