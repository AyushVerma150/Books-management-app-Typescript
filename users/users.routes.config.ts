import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app
            .route(`/users`)
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateMatchingPassword,
                UsersController.createUser
        );
        this.app.post( `/users/login`,
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailDoesntExist,
            UsersMiddleware.validateUserCredentials,
            UsersController.getUserById
        )

        this.app.post( `/users/editUser`,
            UsersMiddleware.validatePatchEmail,
            UsersController.editUser );
        
        this.app.post( `/users/removeUser`,
            UsersMiddleware.validatePatchEmail,
            UsersController.removeUser);

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.post(`/users/resetPassword`, [
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateUserCredentials,
            UsersController.put,
        ]);

    
        return this.app;
    }
}
