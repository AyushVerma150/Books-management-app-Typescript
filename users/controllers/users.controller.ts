import express from 'express';
import usersService from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';
import ResponseHandler from '../../helpers/response';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController
{
    
    async listUsers( req: express.Request, res: express.Response )
    {
        
        const users = await usersService.list(100, 0);
        if ( users.errorMsg )
        {
            return ResponseHandler.sendError( res, users );
        }
        return ResponseHandler.sendData( res, users );
    }

    async getUserById( req: express.Request, res: express.Response )
    {
        
        const user = await usersService.readById(req.body.id);
        if ( user.errorMsg )
        {
            return ResponseHandler.sendError( res, user);
        }
        return ResponseHandler.sendData( res, user );
    }

    async createUser( req: express.Request, res: express.Response )
    {
        req.body.password = await argon2.hash( req.body.password );
        const userCreated = await usersService.create( req.body );
        if ( userCreated.errorMsg )
        {
            return ResponseHandler.sendError( res, userCreated );
        }
        return ResponseHandler.sendData( res, userCreated );
        
    }

    async editUser( req: express.Request, res: express.Response )
    {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        const userUpdated = await usersService.patchById(req.body.id, req.body);
        if ( userUpdated.errorMsg )
        {
            return ResponseHandler.sendError( res, userUpdated );
        }
        return ResponseHandler.sendMessage( res, userUpdated );
        
    }

    async put( req: express.Request, res: express.Response )
    {
        
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser( req: express.Request, res: express.Response )
    {
        
        const userDeleted = await usersService.deleteById(req.body.id);
        if ( userDeleted.errorMsg )
        {
            return ResponseHandler.sendError( res, userDeleted );
        }
        return ResponseHandler.sendMessage( res,userDeleted );

    }
}

export default new UsersController();
