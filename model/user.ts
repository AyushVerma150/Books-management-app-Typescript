
import sequelize from '../helpers/database';
import { CreateUserDto } from '../users/dto/create.user.dto';

import {  Model, DataTypes} from "sequelize";

interface UserInstance
  extends Model<CreateUserDto>,
  CreateUserDto
{
    createdAt?: Date;
    updatedAt?: Date;
    }

const UserModel = sequelize.define<UserInstance>( "User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement:true
  },
  firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  lastName :  {
    type: DataTypes.STRING,
    allowNull:false
    },
  email: {
    type: DataTypes.STRING,
    allowNull:false
    },
  password: {
    type: DataTypes.STRING,
    allowNull:false
    },
  permissionLevel: {
    type: DataTypes.STRING,
    allowNull:false
  },
});

export default UserModel;

