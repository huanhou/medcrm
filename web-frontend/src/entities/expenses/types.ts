export interface Expense {
    id: string;
    category: string;
    amount: number;
    created_at: string;
    description?:string;
    staffName?:string;
}
