export interface CRUD {
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: number, resource: any) => Promise<string>;
    readById: (id: number) => Promise<any>;
    deleteById: (id: number) => Promise<string>;
    patchById: ( id: number, resource: any ) => Promise<string>;
    createBook?: ( resource: any, userId: number ) => Promise<any>;
    fetchAuthorBook?: ( id:number ) => Promise<any>;
}
