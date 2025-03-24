import {Role} from "@/types/safeuser.type";
import {fetcher} from "@/api/lib/fetcher";

type SignUpRespons = {
    user: {
        id: string;
        email: string;
        name: string;
        role: Role;
    };
};


export async function signUp(name: string, surname: string, email: string, password: string): Promise<SignUpRespons> {
    return fetcher('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, surname, email, password }),
    })
}