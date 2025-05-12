import { DictionaryType } from "@/shared/config/i18n";

export const dictionaryMap = (dictionary: DictionaryType) => ({
    staff: {
        buttons: dictionary.buttons,
        modal: dictionary.modal,
        successNotifications: dictionary.successNotifications,
        errorNotifications: dictionary.errorNotifications,
    },
    roles: {
        buttons: {
            addStaff: dictionary.buttons.addRole,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleRole,
            messageStaff: dictionary.modal.messageRole,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteRole,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteRole,
        },
    },
    permissions: {
        buttons: {
            addStaff: dictionary.buttons.addPermission,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titlePermission,
            messageStaff: dictionary.modal.messagePermission,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deletePermission,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deletePermission,
        },
    },
    patients: {
        buttons: {
            addStaff: dictionary.buttons.addPatient,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titlePatient,
            messageStaff: dictionary.modal.messagePatient,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deletePatient,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deletePatient,
        },
    },
    appointments: {
        buttons: {
            addStaff: dictionary.buttons.addAppointment,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleAppointment,
            messageStaff: dictionary.modal.messageAppointment,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteAppointment,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteAppointment,
        },
    },
    filials: {
        buttons: {
            addStaff: dictionary.buttons.addDepartment,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleDepartment,
            messageStaff: dictionary.modal.messageDepartment,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteDepartment,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteDepartment,
        },
    },
    expenseCategories: {
        buttons: {
            addStaff: dictionary.buttons.addExpenseCategory,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleExpenseCategory,
            messageStaff: dictionary.modal.messageExpenseCategory,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteExpenseCategory,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteExpenseCategory,
        },
    },
    services: {
        buttons: {
            addStaff: dictionary.buttons.addService,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleService,
            messageStaff: dictionary.modal.messageService,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteService,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteService,
        },
    },
    expenses: {
        buttons: {
            addStaff: dictionary.buttons.addExpense,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleExpense,
            messageStaff: dictionary.modal.messageExpense,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteExpense,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteExpense,
        },
    },

    specialists: {
        buttons: {
            addStaff: dictionary.buttons.addSpecialist,
            delete: dictionary.buttons.delete,
        },
        modal: {
            titleStaff: dictionary.modal.titleSpecialist,
            messageStaff: dictionary.modal.messageSpecialist,
        },
        successNotifications: {
            deleteStaff: dictionary.successNotifications.deleteSpecialist,
        },
        errorNotifications: {
            deleteStaff: dictionary.errorNotifications.deleteSpecialist,
        },
    },
});
