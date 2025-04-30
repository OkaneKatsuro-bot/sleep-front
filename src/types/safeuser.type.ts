
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR"
}
export interface SafeUser {
    name: string | null
    id: string
    email: string | null
    surname: string | null
    phone: string | null
    image: string | null
    role: Role
    password: string | null
    registrationDate: Date
    specialty: string | null
    description: string | null
    [key: string]: unknown;



}

