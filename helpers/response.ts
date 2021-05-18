import Express from "express";


class ResponseHandler
{
    
    constructor()
    {
        console.log( "A new class initialized for sending response" );
    }

    sendMessage( res: Express.Response , message:any)
    {
        return res.status( message.status ).send( { msg: message.msg } );
    }

    sendData( res: Express.Response , data:any)
    {
        return res.status( data.status ).send( { data: data.data} );
    }

    sendError( res: Express.Response , err:any)
    {
        return res.status( err.status ).send( { error: err.errorMsg} ).end();
    }
    

}

export default new ResponseHandler();

