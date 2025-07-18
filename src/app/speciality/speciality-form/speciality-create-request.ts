export interface SpecialityCreateRequest {
    description:string;
    collaboratorId: string;
    technologyId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
}