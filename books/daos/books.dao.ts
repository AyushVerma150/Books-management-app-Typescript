import shortid from 'shortid';
import debug from 'debug';
import BookModel from '../../model/book';
import { CreateBookDto } from '../dto/create.book.dto';
import UsersDao from '../../users/daos/users.dao';
import constants from '../../constants/constants';
const log: debug.IDebugger = debug('app:in-memory-dao');


class BooksDao
{

    async addBook( book: CreateBookDto , userId:number)
    {
        const user = await UsersDao.getUserById(userId);
        if ( user )
        {
            const newBook = await BookModel.create(book);
            if ( newBook )
            {
                return {
                    data: newBook,
                    status: constants.status.ok
                };
            }
        }
        return {
            errorMsg: constants.books.error.bookAdded,
            status: constants.status.internalServerError
        };
    }

    async listBook()
    {
        const allBooks = await BookModel.findAll();
        if ( allBooks )
        {
            return { data: allBooks, status:  constants.status.ok}
        }
        return {
            errorMsg: constants.books.error.booksFetched,
            status: constants.status.internalServerError
        };
    }


    async removeBook(id:number)
    {
        const bookFound = await BookModel.findOne(
            {
                where:
                {
                    id
                }
            }
        );
        if ( bookFound )
        {
            const bookDeleted= await  BookModel.destroy
                (
                    {
                        where: {
                            id
                        }
                    }
            );
            if ( bookDeleted )
            {
                return {
                    msg: constants.books.success.bookDeletion,
                    status: constants.status.ok
                }
            }
        }
        return {
            errorMsg: constants.books.error.bookDeletion,
            status: constants.status.internalServerError
        };
    }

       
    async fetchAuthorBook(id:number)
    {
        const allBooks = await BookModel.findAll( {
            where:
            {
                UserId:id
            }
        });
        if ( allBooks.length>=1)
        {
            return {
                data: allBooks,
                status: constants.status.ok
            }
        }
        else
        {
            return {
                errorMsg: constants.books.error.booksFound,
                status: constants.status.internalServerError
            };
        }
    }
    
    async editBook( id:number , resource :any)
    {
        const prevBook = await BookModel.findOne(
            {
                where:
                {
                    id
                }
            }
        );
        if ( prevBook )
        {
            const updatedDetails = await BookModel.update(
                {
                    author: resource.author,
                    overview:resource.overview,
                    pages:resource.pages,
                    title:resource.title,
                    publishingCompany:resource.publishingCompany,
                    available:resource.available,
                    isbnCode:resource.isbnCode
                },
                {
                    where:
                    {
                        id
                    }
                }
            )
            return {
                msg: constants.books.success.BookUpdate,
                status: constants.status.ok
            };
        }
        return {
            errorMsg: constants.books.error.BookUpdate,
            status: constants.status.internalServerError
        };
    }
    
}

export default new BooksDao();