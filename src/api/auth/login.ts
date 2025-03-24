import { fetcher } from "@/api/lib/fetcher";
import { Role } from "@/types/safeuser.type";

type LoginResponse = {
    user: {
        id: string;
        email: string;
        name: string;
        role: Role;
    };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
    return fetcher<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}
