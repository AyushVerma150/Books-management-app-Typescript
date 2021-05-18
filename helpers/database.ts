//equire( 'custom-env' ).env( process.env.NODE_ENV );
import { Sequelize } from 'sequelize';

//initializing the Database creation...
//@ts-ignore
const sequelize = new Sequelize( process.env.Db_Name, process.env.Db_User, process.env.Db_Pass,
    {
        dialect: process.env.Db_Dialect,
        host: process.env.Db_Host
    } );

export default sequelize;
