export interface StaffSession {
    id: string;
    fio: string;
    email: string | null;
    phone_number: string;
    role: string;
    filial: string;
    iat: number;
    exp: number;
}