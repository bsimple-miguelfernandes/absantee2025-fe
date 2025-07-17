export interface Assignment {
    id: string;
    collaboratorId: string;
    deviceId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
}
