export interface AssignmentViewModel {
    id: string;
    collaboratorId: string;
    deviceDescription: string;
    deviceModel: string;
    deviceSerialNumber: string;
    period: {
        initDate: Date;
        finalDate: Date;
    };
}
