import Express from "express";

interface MessageDto
{
    msg: string,
    status:number
}

interface ErrorDto
{
    errorMsg: string,
    status:number
}
interface DataDto
{
    data:[]|{},
    status:number
}

class ResponseHandler
{
    
    sendMessage( res: Express.Response , message:MessageDto)
    {
        return res.status( message.status ).send( { msg: message.msg } );
    }

    sendData( res: Express.Response , data:DataDto | any)
    {
        return res.status( data.status ).send( { data: data.data} );
    }

    sendError( res: Express.Response , err:ErrorDto)
    {
        return res.status( err.status ).send( { error: err.errorMsg} ).end();
    }

}

export default new ResponseHandler();

