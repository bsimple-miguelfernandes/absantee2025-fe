export interface AssignmentViewModel {
    id: string;
    deviceId: string;
    collaboratorId: string;
    period: {
        initDate: Date;
        finalDate: Date;
    };
    collaboratorName: string;
    collaboratorEmail: string;
    deviceDescription: string;
    deviceModel: string;
    deviceSerialNumber: string;
}
