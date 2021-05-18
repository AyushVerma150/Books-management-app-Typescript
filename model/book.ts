import sequelize from '../helpers/database';
import { CreateBookDto } from '../books/dto/create.book.dto';
import {  Model, DataTypes} from "sequelize";
import UserModel from '../model/user';

interface BookInstance
  extends Model<CreateBookDto>,
 CreateBookDto
{
    createdAt?: Date;
    updatedAt?: Date;
    }

const BookModel = sequelize.define<BookInstance>( "book", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    author:  {
        type: DataTypes.STRING,
        allowNull:false
        },
    isbnCode: {
        type: DataTypes.STRING,
        allowNull:false
        },
    overview: {
        type: DataTypes.STRING,
        allowNull:false
        },
    cost: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false
        },
    publishingCompany:
    {
        type: DataTypes.STRING,
        allowNull:false
    },
    available:
    {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    pages:
    {
        type: DataTypes.INTEGER,
        allowNull:false
    }
} );

BookModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(BookModel);

export default BookModel;

