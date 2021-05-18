import BooksDao from '../daos/books.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateBookDto } from '../dto/create.book.dto';


class BooksService implements CRUD

{
    async create(resource: CreateBookDto)
    {
        return;
    }
    async createBook( resource: CreateBookDto  , userId:number)
    {
        return BooksDao.addBook( resource  ,userId );
    }

    async deleteById( id: number )
    {
        return "";
    }

    async list( limit: number, page: number )
    {
        return BooksDao.listBook();
    }

    async patchById( id: number, resource: any): Promise<any>
    {
        return BooksDao.editBook( id, resource );
    }

    async putById( id: number, resource: any ): Promise<any>
    {
        return BooksDao.editBook( id, resource );
    }
    async readById( id: number ): Promise<any>
    {
        return 
    }
    async fetchAuthorBook( id: number )
    {
        return BooksDao.fetchAuthorBook(id );
    }

}

export default new BooksService();
