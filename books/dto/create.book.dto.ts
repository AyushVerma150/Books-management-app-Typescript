export interface CreateBookDto {
    id?: number;
    title: string;
    author: string;
    isbnCode: string;
    pages: string;
    overview: string;
    publishingCompany: string;
    available: boolean;
    cost: number;
    UserId?: number;
}
