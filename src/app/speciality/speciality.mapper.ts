import { Speciality } from "./speciality";
import { specialityDTO } from "./specialityDTO";


export function toSpecialityDTO(dto: Speciality): specialityDTO {
    return {
        id: dto.id,
        description:dto.description,
        technologyId: dto.technologyId,
        collaboratorId: dto.collaboratorId,
        period: {
            initDate: new Date(dto.periodDate.initDate),
            finalDate: new Date(dto.periodDate.finalDate),
        }
    };
}