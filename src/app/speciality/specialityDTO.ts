export interface specialityDTO {
    id: string;
    description:string;
    technologyId: string;
    collaboratorId: string;
    periodDate: {
        initDate: Date;
        finalDate: Date;
    };
}