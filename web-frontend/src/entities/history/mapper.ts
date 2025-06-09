import { GetTransactionsResponse } from "@/shared/api/types";
import { TransactionHistory } from "./types";

export const mapToTransactionHistory = (data: GetTransactionsResponse): TransactionHistory[] => {
    return data.map((item) => ({
        id: item.id,
        service: item.TransactionServices.map(ts => ts.Service.name).join(', '),
        patient: item.Patient.fio,
        amount: item.amount,
        status: item.status,
        payment_method: item.payment_method
    }));
};
