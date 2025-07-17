export interface AssignmentCreateRequest {
    collaboratorId: string;
    deviceId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
}