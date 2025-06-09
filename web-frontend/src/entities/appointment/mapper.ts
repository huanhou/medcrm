import { GetAppointmentsResponse, BackendAppointment } from "@/shared/api/types";
import { Appointment } from "./types";
import { DictionaryType } from "@/shared/config/i18n";

export const mapToAppointments = (
    dictionary: DictionaryType,
    data: GetAppointmentsResponse, // array alias
): Appointment[] => {
    const { sharedForm } = dictionary;

    if (!Array.isArray(data)) {
        console.warn("Expected array of appointments but received:", data);
        return [];
    }

    return data.map((item: BackendAppointment) => ({
        id: item.id,
        patient_fio: item.Patient.fio,
        doctor_fio: item.Specialist.fio,
        date_time: item.date_time,
        status:
            item.status === "completed"
                ? sharedForm.statuses.completed
                : item.status === "cancelled"
                    ? sharedForm.statuses.cancelled
                    : sharedForm.statuses.scheduled,
    }));
};
