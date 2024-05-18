export default interface Post {
    id: number;
    title: string;
    contents: string;
    summary: string;
    createdOn: string;
    updatedOn: string;
    category: string;
    tags: [string];
    author: {
        username: string;
    }
}

