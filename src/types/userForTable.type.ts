export type userForTable = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    consul: {
        id: number;
        date: string;
        name: string;
        contact: string;
        isRead: boolean;
        coment: string;
    }[];
};