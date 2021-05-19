import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';

class UsersService implements CRUD {
    async create( resource: CreateUserDto )
    {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: number) : Promise<any>  {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    }

    async patchById(id: number, resource: PatchUserDto): Promise<any> {
        return UsersDao.patchUserById(id, resource);
    }

    async putById(id: number, resource: PutUserDto): Promise<any> {
        return UsersDao.putUserById(id, resource);
    }

    async readById(id: number) {
        return UsersDao.getUserById(id);
    }

    async getUserByEmail( email: string )
    {
        return UsersDao.getUserByEmail(email);
    }
    
    async resetUserPassword( id: number, password: string )
    {
        return UsersDao.resetPassword( id, password );
    }
}

export default new UsersService();
