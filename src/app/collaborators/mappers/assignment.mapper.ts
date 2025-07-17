import { Assignment } from "../../assignments/assignment";
import { AssignmentViewModel } from "../../assignments/assignment.viewmodel";

export function toAssignmentViewModel(
    a: Assignment,
    collaboratorId: string,
    description: string,
    model: string,
    serialNumber: string
): AssignmentViewModel {
    return {
        id: a.id,
        collaboratorId: collaboratorId,
        deviceDescription: description,
        deviceModel: model,
        deviceSerialNumber: serialNumber,
        period: {
            initDate: new Date(a.periodDate.initDate),
            finalDate: new Date(a.periodDate.finalDate)
        }
    };
}
