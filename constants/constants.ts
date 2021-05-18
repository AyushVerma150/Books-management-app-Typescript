const constants =
{
    users:
    {
        success:
        {
            userUpdated: "User details are updated",
            removeUser:"Remove User Success"
        },
        error:
        {
            createUser: "User not created",
            userFound: "No user found",
            userUpdated: "User details could not be updated",
            validCredentials: "Authentication failed , check E-mail or Password",
            removeUser: "Cannot Delete User",
            passwordMismatch:"Passwords do not match"
        }
    },
    books:
    {
        success:
        {
            bookAdded: "Book Added Successfully",
            booksFetched: "Books Fetched Successfully",
            BookUpdate:"Book Update Success"

        },
        error:
        {
            bookAdded: "Book Addition Failed",
            booksFetched: "Could not fetch books",
            booksFound: "No books Found",
            BookUpdate:"Could not update Book details"
            
        }
    },
    status:
    {
        ok: 200,
        internalServerError: 500,
        unprocessableEntity: 400,
        notFound: 404,
    }
}


export default Object.freeze(constants);