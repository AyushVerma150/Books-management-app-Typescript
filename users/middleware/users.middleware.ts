import express from 'express';
import userService from '../services/users.service';
import debug from 'debug';
import ResponseHandler from '../../helpers/response';
import constants from '../../constants/constants';
import argon2 from 'argon2';

const log: debug.IDebugger = debug('app:users-controller');
class UsersMiddleware 
{
    
    async validateRequiredUserBodyFields
        (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) 
    {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            return ResponseHandler.sendError(
                res,
                {
                    errorMsg: constants.users.error.validCredentials,
                    status: constants.status.internalServerError
                } );
        }
    }

    async validateSameEmailDoesntExist
        (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    { 
        const user = await userService.getUserByEmail(req.body.email);
        if (user.errorMsg) {
            return ResponseHandler.sendError( res, user );
        } else {
            next();
        }
    }

    async validateMatchingPassword
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
    )
    {
        const password = req.body.password;
        const confirmPassword = req.body.comfirmPassword;
        if ( password !== confirmPassword )
        {
            return ResponseHandler.sendError( res, {
                errorMsg: constants.users.error.passwordMismatch,
                status: constants.status.internalServerError
            } );
        }
        else
        {
            next();
        }
    }


    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        next();
    }

    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if ( req.body.email )
        {
            const user = await userService.getUserByEmail( req.body.email );
            if ( user.errorMsg )
            {
                return ResponseHandler.sendError(res,user);
            }
            else
            {
                next();
            }
            
        }
    };

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    )
    {
        next();
    }

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
         next();
    }
    async validateUserCredentials(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction )
    {
        const user = await userService.getUserByEmail( req.body.email );
        if ( user.data )
        {
            const passwordVerified = await argon2.verify( user.data.password, req.body.password );
            if (! passwordVerified )
            {
                return ResponseHandler.sendError( res, {
                    errorMsg: constants.users.error.passwordMismatch,
                    status: constants.status.internalServerError
                } );
            }
            else
            {
                next();
            }
            
        }
    }
}

export default new UsersMiddleware();
