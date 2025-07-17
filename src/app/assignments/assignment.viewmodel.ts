export interface AssignmentViewModel {
    id: string;
    collaboratorName: string;
    collaboratorEmail: string;
    deviceDescription: string;
    deviceModel: string;
    deviceSerialNumber: string;
    period: {
        initDate: Date;
        finalDate: Date;
    };
}
