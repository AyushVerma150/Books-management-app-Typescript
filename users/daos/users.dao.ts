import shortid from 'shortid';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import UserModel from '../../model/user';
import constants from '../../constants/constants';
const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];

    async addUser( user: CreateUserDto )
    {
        const newUser = await UserModel.create( user );
        if ( newUser )
        {
            return {
                data: newUser,
                status: constants.status.ok
            };
        }
        return {
            errorMsg: constants.users.error.createUser,
            status: constants.status.internalServerError
        };
    }

    async getUsers()
    {
        const allUsers = await UserModel.findAll();
        if ( allUsers )
        {
            return {
                data: allUsers,
                status:constants.status.ok
            };
        }
        return {
            errorMsg: constants.users.error.userFound,
            status: constants.status.internalServerError
        };
    }

    async getUserById( userId: number )
    {
        const userInfo = await UserModel.findOne(
            {
                where:
                {
                    id: userId
                }
            }
        );
        if ( userInfo )
        {
            return {
                data: userInfo,
                status: constants.status.ok
            };
        }
        return {
            errorMsg: constants.users.error.userFound,
            status: constants.status.internalServerError
        };
    }

    async putUserById( userId: number, user: PutUserDto )
    {
        const objIndex = this.users.findIndex(
            (obj: { id: number}) => obj.id === userId
        );
        this.users.splice(objIndex, 1, user);
        return `${user.id} updated via put`;
    }

    async patchUserById( userId: number, user: PatchUserDto )
    {
        const existingUser = await UserModel.findOne(
            {
                where:
                {
                    id:userId
                }
            }
        )
        if ( existingUser )
        {
            const updateUser = await UserModel.update(
                user,
                {
                    where:
                    {
                        id: userId
                    }
                }
            );
            if ( updateUser )
            {
                return {
                msg: constants.users.success.userUpdated,
                status: constants.status.ok
            }; 
                }
        }
        return {
            errorMsg: constants.users.error.userUpdated,
            status: constants.status.internalServerError
        };
    }

    async removeUserById( userId: number ) 
    {
       const userDeleted = await  UserModel.destroy({
            where: { id: userId }
       } )
        if ( userDeleted )
        {
            return {
                msg: constants.users.success.removeUser,
                status: constants.status.ok
            }; 
        }
        
           return {
            errorMsg: constants.users.error.removeUser,
            status: constants.status.internalServerError
        }; 
    }

    async getUserByEmail( email: string )
    {
        const existingUser = await UserModel.findOne( {
            where: {
            email:email
            }
        } );
        if ( existingUser )
        {
            return {
                data: existingUser,
                status: constants.status.ok
            };
        }
        return {
            errorMsg: constants.users.error.userFound,
            status: constants.status.internalServerError
        };
       
    }
}

export default new UsersDao();
