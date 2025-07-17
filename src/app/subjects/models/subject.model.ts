export interface Subject {
    id: string,
    description: string,
    details: string
}

export interface SubjectPageDTO {
    pageSubjects: Subject[];
}