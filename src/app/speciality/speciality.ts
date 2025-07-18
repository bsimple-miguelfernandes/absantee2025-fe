export interface Speciality {
    id: string;
    description: string;
    collaboratorId: string;
    technologyId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
}