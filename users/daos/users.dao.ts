import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import UserModel from '../../model/user';
import constants from '../../constants/constants';
import argon2 from 'argon2';
const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {

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

    async resetPassword(id :number, password:string)
    {
        const userFound = await UserModel.findOne(
            {
                where:
                {
                    id
                }
            }
        );
        if(userFound)
        {
            const hashedPassword = await argon2.hash( password );

            const updateUser = await UserModel.update(
                {
                    password:hashedPassword
                }
                ,
                {
                    where:
                    {
                        id
                    }
                }
            );
            if(updateUser)
            {
                return {
                    msg:constants.users.success.passwordUpdated,
                    status:constants.status.ok
                };
            }
        }
        else if(!userFound)
        {
            return {
                errorMsg:constants.users.error.passwordUpdated,
                status:constants.status.ok
            };
        }
        
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
        const userDeleted = await UserModel.destroy( {
            where: { id: userId }
        } );
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
