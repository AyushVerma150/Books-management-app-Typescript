import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { BooksRoutes } from './books/books.routes.config';
import debug from 'debug';
import sequelize from './helpers/database';
import constants from './constants/constants';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

app.use(expressWinston.logger(loggerOptions));

routes.push( new UsersRoutes( app ) );
routes.push( new BooksRoutes( app ) );

sequelize.sync();
server.listen(process.env.PORT, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(constants.others.debugLog + route.getName());
    });
    console.log(constants.others.runningMessage + process.env.PORT);
});