export interface specialityDTO {
    id: string;
    description:string;
    technologyId: string;
    collaboratorId: string;
    period: {
        initDate: Date;
        finalDate: Date;
    };
}