export interface AssignmentDetails {
    id: string;
    deviceId: string;
    collaboratorId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
    collaboratorName: string;
    collaboratorEmail: string;
    deviceDescription: string;
    deviceBrand: string;
    deviceModel: string;
    deviceSerialNumber: string;
}
