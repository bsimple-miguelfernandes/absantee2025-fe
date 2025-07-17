export interface AssignmentFormModel {
    collaboratorId: string;
    deviceId?: string;
    useNewDevice: boolean;
    deviceDescription?: string;
    deviceBrand?: string;
    deviceModel?: string;
    deviceSerialNumber?: string;
    initDate: Date;
    finalDate: Date;
}
