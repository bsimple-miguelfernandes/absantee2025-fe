import { AssignmentDetails } from "../../assignments/assignment-details";
import { AssignmentViewModel } from "../../assignments/assignment.viewmodel";


export function toAssignmentViewModel(dto: AssignmentDetails): AssignmentViewModel {
    return {
        id: dto.id,
        deviceId: dto.deviceId,
        collaboratorId: dto.collaboratorId,
        collaboratorName: dto.collaboratorName,
        collaboratorEmail: dto.collaboratorEmail,
        deviceDescription: dto.deviceDescription,
        deviceModel: dto.deviceModel,
        deviceSerialNumber: dto.deviceSerialNumber,
        period: {
            initDate: new Date(dto.periodDate.initDate),
            finalDate: new Date(dto.periodDate.finalDate),
        }
    };
}
