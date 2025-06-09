export interface TransactionHistory {
    id: string;
    service: string;
    patient: string;
    amount: number;
    status: string;
    payment_method: string;
}
